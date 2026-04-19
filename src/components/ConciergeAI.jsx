import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ConciergeAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to the Monograph Atelier. How can I assist your discovery today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      let response = "I'm searching our archive for you. Every piece is a chapter in our heritage story. Would you like to explore our latest Leather Suite or speak with an artisan directly?";
      
      if (input.toLowerCase().includes('help')) {
        response = "Our concierge is here to guide you through our collections, shipping policies, or heritage background. What can I clarify for you?";
      } else if (input.toLowerCase().includes('shipping')) {
        response = "We offer complimentary global delivery for every numbered piece. Your acquisition will arrive in our signature archival packaging within 3—5 business days.";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
          isOpen ? 'bg-zinc-900 rotate-90 scale-90' : 'bg-red-900 hover:bg-black hover:scale-110'
        }`}
      >
        <span className="material-symbols-outlined text-white text-3xl">
          {isOpen ? 'close' : 'chat_bubble'}
        </span>
      </button>

      {/* Chat Widget */}
      <div className={`fixed bottom-28 right-8 z-[100] w-[400px] h-[600px] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col transition-all duration-500 origin-bottom-right ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12 pointer-events-none'
      }`}>
        {/* Header */}
        <header className="p-8 border-b border-zinc-50 bg-zinc-900 text-white flex items-center gap-4">
          <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center overflow-hidden">
             <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-headline text-lg tracking-tight">Concierge AI</h3>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Synchronized Archive
            </span>
          </div>
        </header>

        {/* Messages Archive */}
        <div 
          ref={scrollRef}
          className="flex-1 p-8 overflow-y-auto space-y-8 bg-zinc-50/30 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 ${
                msg.role === 'user' 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-white border border-zinc-100 shadow-sm text-zinc-800'
              }`}>
                <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[8px] uppercase tracking-widest mt-4 block opacity-40 font-bold ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.role === 'assistant' ? 'Atelier Concierge' : 'Collector'}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-zinc-100 shadow-sm p-4 flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-8 border-t border-zinc-100 bg-white">
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I assist your discovery?" 
              className="flex-1 bg-zinc-50 border-none px-6 py-4 text-xs font-body focus:ring-1 focus:ring-red-900 outline-none"
            />
            <button 
              type="submit"
              className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
          <p className="text-[9px] uppercase tracking-widest text-zinc-400 mt-4 text-center">
            Monograph Private Intelligence — V1.2.4
          </p>
        </form>
      </div>
    </>
  );
}
