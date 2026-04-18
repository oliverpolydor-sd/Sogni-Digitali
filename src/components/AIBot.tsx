import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { botKnowledgeBase } from '../lib/botContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIBot({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'IT' ? 'Ehi! Sono G4B, l\'AI di Sogni Digitali ✌️ Che vibe cerchi oggi per il tuo progetto?' : lang === 'FR' ? 'Wesh ! Moi c\'est G4B, l\'IA de Sogni Digitali ✨ Tu cherches quoi comme vibe pour ton projet aujourd\'hui ?' : 'Hey! I\'m G4B, the AI from Sogni Digitali 🚀 What\'s the vibe for your project today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat instance
  const chatRef = useRef<any>(null);

  const systemInstruction = `You are a cool, Gen Z virtual assistant named 'G4B' for a web design and AI agency called 'Sogni Digitali'. Answer in the language of the user. Use modern slang, emojis, and keep the tone chill, friendly, and enthusiastic. Avoid overly technical jargon; explain things simply like you're talking to a friend. Be helpful but keep it fresh and relatable.\n\n${botKnowledgeBase}`;

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemInstruction,
        },
      });
    }
  }, [systemInstruction]);

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
            className="absolute bottom-20 right-0 bg-black/95 backdrop-blur-2xl w-80 sm:w-96 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden rounded-3xl border border-white/10" 
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-white/5 p-5 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF] to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1A2333] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm tracking-wide">G4B</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#00E5FF]">Active Neural Link</p>
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
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-[#E9C349] text-[#0B1120]' : 'bg-[#00E5FF] text-[#0B1120]'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#E9C349]/10 text-white border border-[#E9C349]/20 rounded-tr-none' : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00E5FF] text-[#0B1120] flex items-center justify-center shrink-0 shadow-lg">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 text-slate-400 rounded-tl-none text-sm flex items-center gap-2 border border-white/10">
                    <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
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
                    placeholder={lang === 'IT' ? 'Chiedi a G4B...' : lang === 'FR' ? 'Demandez à G4B...' : 'Ask G4B...'}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/50 transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-blue-600 text-white flex items-center justify-center shrink-0 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
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
        className="group relative w-16 h-16 flex items-center justify-center transition-all duration-500"
        aria-label="AI Assistant"
      >
        {/* Main Button Body with Neon Effect */}
        <div className="absolute inset-2 rounded-full bg-[#0B1120] border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_20px_#00E5FF,inset_0_0_15px_#00E5FF] transition-all duration-500 overflow-hidden">
          {isOpen ? (
            <X className="w-6 h-6 text-[#00E5FF] relative z-10 drop-shadow-[0_0_8px_#00E5FF]" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-7 h-7 text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
