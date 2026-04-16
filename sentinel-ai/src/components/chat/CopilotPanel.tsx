"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello Admin. I am Sentinel AI Copilot. How can I assist you with threat intelligence today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: messages }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM ERROR: Failed to reach AI Core. Check API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#121821] border border-[#1E293B] shadow-[0_0_20px_rgba(0,212,255,0.15)] text-[#00D4FF] hover:bg-[#1E293B] transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh] bg-[#0B0F14]/95 backdrop-blur-xl border border-[#1E293B] shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#121821]/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#1E293B] flex items-center justify-center text-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Sentinel Copilot</h3>
                  <p className="text-xs text-[#00D4FF] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" /> Active
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-[#1E293B] text-white rounded-tr-sm border border-[#334155]' : 'bg-[#121821] text-[#E2E8F0] border border-[#1E293B] rounded-tl-sm'}`}>
                    <div className="flex items-center gap-2 mb-1 opacity-50">
                      {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-[#00D4FF]" />}
                      <span className="text-[10px] uppercase font-mono tracking-wider">{msg.role}</span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg p-3 bg-[#121821] text-[#E2E8F0] border border-[#1E293B] rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#00D4FF]" />
                    <span className="text-sm font-mono text-[#00D4FF]">Analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#1E293B] bg-[#121821]/50 shrink-0">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about threats, vulnerabilities..."
                  className="w-full bg-[#0B0F14] border border-[#1E293B] text-white text-sm rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_10px_rgba(0,212,255,0.1)] transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#94A3B8] hover:text-[#00D4FF] disabled:opacity-50 disabled:hover:text-[#94A3B8] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
