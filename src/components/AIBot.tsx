import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { botKnowledgeBase } from '../lib/botContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

const VisionAvatar = ({ className = "w-10 h-10", isActive = true }: { className?: string; isActive?: boolean }) => (
  <div className={`${className} bg-gradient-to-b from-[#2A1118] to-[#0A0B10] rounded-xl flex flex-col items-center justify-start pt-[6px] px-2 border-t border-l border-white/10 shadow-[inset_0_2px_15px_rgba(225,29,72,0.15),0_4px_10px_rgba(0,0,0,0.5)] relative overflow-hidden shrink-0`}>
    <div className="absolute inset-0 z-0 bg-[#E11D48] opacity-[0.03] mix-blend-screen" />
    <div className="absolute -top-6 w-[200%] h-14 bg-gradient-to-b from-[#E11D48]/30 to-transparent blur-[12px] z-0" />
    
    {/* Mind Stone */}
    <div className={`relative z-10 w-2.5 h-3 bg-gradient-to-br from-[#FEF08A] to-[#E9C349] rotate-45 rounded-[1px] ${isActive ? 'shadow-[0_0_15px_#E9C349,0_0_5px_#FFF]' : 'shadow-[0_0_5px_rgba(233,195,73,0.4)]'} border border-white/30 transition-all duration-700`} />
    
    {/* Eyes */}
    <div className="w-full flex justify-center gap-1.5 mt-2.5 z-10">
      <div className={`w-2.5 h-[2px] bg-[#60A5FA] rounded-full transition-all duration-700 ${isActive ? 'shadow-[0_0_10px_#3B82F6,0_0_2px_#FFF] opacity-100' : 'shadow-[0_0_4px_rgba(59,130,246,0.3)] opacity-50'}`} />
      <div className={`w-2.5 h-[2px] bg-[#60A5FA] rounded-full transition-all duration-700 ${isActive ? 'shadow-[0_0_10px_#3B82F6,0_0_2px_#FFF] opacity-100' : 'shadow-[0_0_4px_rgba(59,130,246,0.3)] opacity-50'}`} />
    </div>

    {/* Face synthetic lines */}
    <div className="absolute top-[45%] w-full px-1.5 flex justify-between z-0 opacity-50">
      <div className="w-[1px] h-6 bg-gradient-to-b from-[#E11D48]/60 to-transparent rotate-[15deg]" />
      <div className="w-[1px] h-6 bg-gradient-to-b from-[#E11D48]/60 to-transparent -rotate-[15deg]" />
    </div>

    {/* Chin details */}
    <div className="absolute bottom-1 w-3 h-[1px] bg-white/20 z-10" />
  </div>
);

export default function AIBot({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'IT' ? 'Ehi. Sono VISION, l\'Intelligenza Sintetica di Sogni Digitali. Come posso aiutarti a elevare il tuo business oggi?' : lang === 'FR' ? 'Bonjour. Je suis VISION, l\'Intelligence Synthétique de Sogni Digitali. Comment puis-je vous aider à développer votre activité aujourd\'hui ?' : 'Hello. I\'m VISION, the Synthetic Intelligence for Sogni Digitali. How can I help you elevate your business today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat instance
  const chatRef = useRef<any>(null);

  const [systemInstruction, setSystemInstruction] = useState(`You are VISION, Sogni Digitali's AI.\n\n${botKnowledgeBase}`);

  useEffect(() => {
    Promise.all([
      fetch('/AIchatbot.md').then(res => res.text()),
      fetch('/brand%20book%20and%20manifest.md').then(res => res.text())
    ]).then(([chatbot, brandBook]) => {
      let combined = "";
      if (chatbot && !chatbot.includes('<!DOCTYPE html>')) combined += chatbot + '\n\n';
      if (brandBook && !brandBook.includes('<!DOCTYPE html>')) combined += brandBook + '\n\n';
      
      const finalInstruction = combined + botKnowledgeBase;
      setSystemInstruction(finalInstruction);
      
      // Re-initialize chat to pick up the new instruction
      chatRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: finalInstruction,
        },
      });
    }).catch(err => console.error("Could not load custom AI prompt:", err));
  }, []);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemInstruction,
        },
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: systemInstruction,
          },
        });
      }
      
      const response = await chatRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Sorry, I could not understand that.' }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-[100]">
      <AnimatePresence>
        {/* Chat Window */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 bg-black/95 backdrop-blur-2xl w-80 sm:w-96 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden rounded-2xl border border-[#E11D48]/20" 
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#E11D48]/10 to-transparent p-5 border-b border-[#E11D48]/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <VisionAvatar className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00E5FF] rounded-full border-2 border-[#1A2333] animate-pulse shadow-[0_0_8px_#00E5FF]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm tracking-wide">VISION</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9C349] animate-pulse" />
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#E9C349]">Primary Core Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-black/20">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'user' ? (
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 shadow-lg rounded-full bg-[#E9C349] text-[#0B1120]">
                      <User className="w-4 h-4" />
                    </div>
                  ) : (
                    <VisionAvatar className="w-8 h-8 rounded-lg" />
                  )}
                  <div className={`p-4 max-w-[85%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#E9C349]/10 text-white border border-[#E9C349]/20 rounded-2xl rounded-tr-none' : 'bg-black/60 text-slate-200 border border-[#E11D48]/20 rounded-lg rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <VisionAvatar className="w-8 h-8 rounded-lg" />
                  <div className="p-4 bg-black/60 text-slate-400 rounded-lg rounded-tl-none text-sm flex items-center gap-2 border border-[#E11D48]/20">
                    <div className="w-1.5 h-1.5 bg-[#E9C349] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-white/5 border-t border-white/10 backdrop-blur-md">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={lang === 'IT' ? 'Chiedi a VISION...' : lang === 'FR' ? 'Demandez à VISION...' : 'Ask VISION...'}
                    className="w-full bg-black/40 border border-[#E11D48]/20 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/50 transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#E11D48] to-[#9F1239] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="aibot-toggle-btn group relative w-16 h-16 flex items-center justify-center transition-all duration-500"
        aria-label="AI Assistant"
      >
        {/* Main Button Body with Neon Effect */}
        <div className="absolute inset-2 rounded-2xl bg-[#0B1120] border-2 border-[#E11D48] flex items-center justify-center shadow-[0_0_20px_#E11D48,inset_0_0_15px_rgba(225,29,72,0.3)] transition-all duration-500 overflow-hidden">
          {isOpen ? (
            <X className="w-6 h-6 text-[#E11D48] relative z-10 drop-shadow-[0_0_8px_#E11D48]" />
          ) : (
            <div className="relative z-10 flex items-center justify-center w-full h-full pb-1">
              <VisionAvatar className="w-8 h-8 rounded-lg scale-110" isActive={!isOpen} />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
