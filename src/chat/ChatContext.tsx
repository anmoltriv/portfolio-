import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ChatMessage } from "../types";
import { API_BASE_URL } from "../config";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! I'm Anmol's AI twin. Ask me anything about my full-stack projects, design philosophy, my work at NIT Rourkela, or potential internship opportunities!",
  timestamp: formatTimestamp()
};

const OFFLINE_FALLBACK =
  "Drafting connection... Looks like my primary server node is offline. Offline context: Anmol is an Industrial Design student with a Computer Science Minor at NIT Rourkela with an 8.75 CGPA, available for full-stack software development roles, contract work, and internships. You can contact him at anmolop.works@gmail.com or (+91) 6387297103!";

function formatTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createId(): string {
  return Math.random().toString(36).substring(7);
}

interface ChatContextValue {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  /** Sends `text` if given, otherwise sends and clears the current input. */
  send: (text?: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Read inside the callback so `send` stays referentially stable and doesn't
  // invalidate every consumer on each keystroke or new message.
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const inputRef = useRef(input);
  inputRef.current = input;

  const send = useCallback(async (text?: string) => {
    const content = (text ?? inputRef.current).trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content,
      timestamp: formatTimestamp()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (text === undefined) setInput("");
    setIsLoading(true);

    try {
      const endpoint = `${API_BASE_URL}/api/chat`;
      const history = [...messagesRef.current, userMessage].map((message) => ({
        role: message.role,
        content: message.content
      }));

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!res.ok) throw new Error(`Chat request to ${endpoint} failed with status ${res.status}`);

      // A misconfigured API base resolves to this site's SPA fallback, which
      // returns index.html with a 200. Catch that rather than letting it
      // surface as an opaque JSON parse error.
      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          `Expected JSON from ${endpoint} but got "${contentType}". Check that VITE_API_URL points at the backend.`
        );
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content:
            data.message ||
            "I had trouble loading that response, but feel free to reach out directly to me!",
          timestamp: formatTimestamp()
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: OFFLINE_FALLBACK,
          timestamp: formatTimestamp()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ messages, input, setInput, isLoading, send }),
    [messages, input, isLoading, send]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside a ChatProvider");
  return ctx;
}
