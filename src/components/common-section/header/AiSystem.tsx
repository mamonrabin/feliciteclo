"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "WELCOME TO TITASWEB™ INTELLIGENCE. I AM YOUR PERSONAL STYLIST. DESCRIBE THE VIBE YOU WANT TO ACHIEVE TODAY.",
  },
];

const AiSystem = ({ scrolled }: { scrolled: boolean }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = input.trim();
    if (!content) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content,
      },
    ]);

    setInput("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group cursor-pointer flex items-center gap-2  transition-opacity hover:opacity-60 ${
          scrolled ? "text-primary" : "text-white/80"
        }`}
      >
        <Sparkles
          size={20}
          strokeWidth={1.7}
          className="transition-transform group-hover:scale-110"
        />

        <span
          className={`hidden text-[10px] font-black tracking-[0.2em] uppercase lg:block  ${
            scrolled ? "text-primary" : "text-white/80"
          }`}
        >
          AI_STYLIST [V.1]
        </span>
      </button>

      {/* Modal */}
      <DialogContent
        showCloseButton={false}
        className="
          z-[600]
          flex h-[80dvh] max-h-[800px] w-[calc(100%-32px)]
          max-w-2xl flex-col gap-0
          overflow-hidden rounded-2xl
          border border-gray-100 bg-white p-0
          text-black shadow-2xl
          sm:max-w-2xl
          [&>button]:hidden
        "
      >
        <DialogTitle className="sr-only">Titasweb AI Stylist</DialogTitle>

        <DialogDescription className="sr-only">
          Chat with your personal AI stylist for fashion recommendations.
        </DialogDescription>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-5 md:px-8 md:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
              <Sparkles className="h-4 w-4 text-white" />
            </div>

            <div>
              <h3 className="text-xs font-black uppercase leading-none tracking-widest">
                AI Stylist
              </h3>

              <span className="mt-1 block text-[8px] font-bold uppercase tracking-widest text-gray-400">
                Active Intelligence V1.0
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI Stylist"
            className="rounded-full p-2 transition-colors hover:bg-gray-50"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto p-5 scroll-smooth md:p-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[85%]">
                <div
                  className={`
                    rounded-2xl p-5 text-[11px]
                    font-medium leading-relaxed tracking-wide
                    ${
                      message.role === "user"
                        ? "rounded-tr-none bg-black text-white"
                        : "rounded-tl-none bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 border-t border-gray-100 p-4 md:p-6">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2 md:px-5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for style recommendations..."
              aria-label="Your message"
              className="
                min-w-0 flex-1 border-none bg-transparent
                py-3 text-[11px] font-medium
                text-gray-900 outline-none
                placeholder:text-gray-400
              "
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-lg bg-black
                text-white transition-opacity
                hover:opacity-80 disabled:opacity-20
              "
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiSystem;
