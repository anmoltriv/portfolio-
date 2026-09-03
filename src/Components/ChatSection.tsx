import { useEffect, useRef } from "react";
import { ArrowUpRight, Send, Zap } from "lucide-react";
import Markdown from "react-markdown";
import { useAccent } from "../theme/AccentContext";
import { useChat } from "../chat/ChatContext";

const STARTER_QUESTIONS = [
  "What is your tech stack?",
  "Tell me about NIT Rourkela",
  "Are you available for work and internships?",
  "Tell me about Talkative"
];

const BIO_FACTS = [
  "📍 National Inst. of Technology, Rkl",
  "🎓 Ind Design & CS Minor '28",
  "⚡ Multi-disciplinary visual coding"
];

export default function ChatSection() {
  const { tokens } = useAccent();
  const { messages, input, setInput, isLoading, send } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  // Skip the first run (the welcome message on mount) so the page doesn't jump
  // down to the chat panel on load or refresh.
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section
      id="twin-assistant"
      className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 scroll-mt-24"
    >
      <div
        className={`bg-[#090909] border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative transition-all duration-500 hover:border-white/25 hover:shadow-[0_40px_80px_rgba(0,0,0,0.95)] ${tokens.panelHover}`}
      >
        {/* Internal Top Terminal Strip */}
        <div className="bg-white/[0.02] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full animate-pulse relative ${tokens.bg}`}>
              <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${tokens.ping}`} />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">Anmol&apos;s AI Digital Twin</h3>
              <p className={`text-[10px] font-mono ${tokens.text}`}>ONLINE • READY TO CHAT</p>
            </div>
          </div>

          <div className="flex gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
            <span>Model Reference</span>
            <span className={tokens.text}>gemini-2.5-flash</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* Live Context Prompt Selector Column (Left side) */}
          <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.01]">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-3">
              Quick Prompts
            </span>
            <p className="text-xs text-white/50 mb-5 leading-relaxed">
              Click any pre-crafted question below to test my cognitive responsiveness, design
              opinions, or work status instantly.
            </p>

            <div className="space-y-2.5">
              {STARTER_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => send(question)}
                  disabled={isLoading}
                  className="w-full text-left font-sans text-xs bg-white/[0.02] hover:bg-white/5 border border-white/10 px-4 py-3 rounded-xl transition active:scale-98 text-white/80 hover:text-white group flex justify-between items-center"
                >
                  <span>{question}</span>
                  <ArrowUpRight
                    className={`w-3.5 h-3.5 text-white/30 transition ${tokens.groupHoverText}`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-3">
                Offline Core Bio
              </span>
              <ul className="text-xs text-white/50 space-y-2 font-mono">
                {BIO_FACTS.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat Conversation Console (Right columns) */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between h-[450px]">

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-slim">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col max-w-[85%] ${message.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-white text-black font-medium rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-white/95 rounded-tl-none font-sans"
                    }`}
                  >
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <div className="markdown-body text-sm max-w-none text-white/90 space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_strong]:text-white [&_strong]:font-bold [&_a]:text-pink-400 hover:[&_a]:text-pink-300 hover:[&_a]:underline">
                        <Markdown>{message.content}</Markdown>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-white/30 mt-1 uppercase tracking-widest">
                    {message.role === "user" ? "Visitor" : "Anmol-Clone"} • {message.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col max-w-[85%] mr-auto items-start">
                  <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 rounded-tl-none font-mono text-xs flex items-center gap-2">
                    <Zap className={`w-3.5 h-3.5 animate-bounce ${tokens.text}`} />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me something..."
                disabled={isLoading}
                aria-label="Ask Anmol's AI twin a question"
                className={`flex-1 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:outline-none px-5 py-3 rounded-xl text-sm transition font-sans ${tokens.focusBorder}`}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className={`text-black font-bold text-sm px-5 py-3 rounded-xl disabled:opacity-40 transition active:scale-95 flex items-center justify-center cursor-pointer ${tokens.bg}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
