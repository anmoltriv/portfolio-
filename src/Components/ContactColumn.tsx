import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { useAccent } from "../theme/AccentContext";
import { useChat } from "../chat/ChatContext";

const EMAIL = "anmolop.works@gmail.com";
const PHONE = "(+91) 6387297103";

export default function ContactColumn() {
  const { tokens } = useAccent();
  const { send } = useChat();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md:col-span-1 flex flex-col gap-6">

      {/* Available Status Block */}
      <div
        className={`bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-center gap-3.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${tokens.cardHoverTinted}`}
      >
        <div className="relative flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tokens.ping}`}
          />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${tokens.bg}`} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-wider font-mono text-white/40">Status</p>
          <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 ${tokens.text}`}>
            Available for Work &amp; Internships
          </p>
        </div>
      </div>

      {/* Direct Copy Action Block */}
      <div
        className={`bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex-1 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${tokens.cardHover}`}
      >
        <div>
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono block mb-1">
            Email Contact
          </span>
          <p className={`text-sm font-medium tracking-tight truncate font-mono ${tokens.text}`}>
            {EMAIL}
          </p>
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono block mt-3 mb-1">
            Phone Line
          </span>
          <p className="text-xs font-mono text-white/80">{PHONE}</p>
        </div>

        <div className="mt-4">
          <button
            onClick={copyEmail}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs py-2 rounded-lg text-white/80 active:scale-95 transition-all font-semibold"
          >
            {copied ? (
              <>
                <Check className={`w-3.5 h-3.5 ${tokens.text}`} />
                <span className={`font-mono ${tokens.text}`}>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white/60" />
                <span className="font-mono">Copy Email Address</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fast Resume Link to emphasize pre-final student preparedness */}
      <button
        type="button"
        onClick={() => send("Tell me about your tech experiences and resume info")}
        className={`bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center justify-between text-left transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${tokens.cardHover}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-950/20 text-orange-400 border border-orange-500/10">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
              Curriculum Vitae
            </p>
            <p className="text-xs font-bold text-white mt-0.5">Quick Facts</p>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/40" />
      </button>

    </div>
  );
}
