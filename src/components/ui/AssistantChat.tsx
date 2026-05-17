import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages.slice(-10) // Send only the last 10 messages for context
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Apologies, I encountered an error processing your request. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 bg-accentCyan text-bgPrimary rounded-full shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-110 transition-transform ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Assistant Chat"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 md:w-96 max-h-[600px] h-[80vh] bg-bgSurface border border-white/10 shadow-2xl flex flex-col font-sans overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-bgPrimary/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accentCyan/10 text-accentCyan rounded-md">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-display text-lg text-textPrimary leading-none">Vidur</h3>
                <span className="text-[10px] uppercase tracking-widest text-accentCyan font-mono mt-1 block">AI Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-textSecondary hover:text-textPrimary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-textSecondary mt-8 space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-accentCyan/70">System Initialized</p>
                <p className="text-sm">Hello, I am Vidur. How can I help you explore Shuvro's research portfolio?</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`p-2 rounded-full shrink-0 flex items-center justify-center self-end w-8 h-8 ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-accentCyan/20 text-accentCyan'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`px-4 py-2 text-sm leading-relaxed max-w-[80%] ${msg.role === 'user' ? 'bg-white/10 text-textPrimary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' : 'bg-bgPrimary border border-white/5 text-textSecondary rounded-tr-2xl rounded-tl-2xl rounded-br-2xl'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="p-2 rounded-full shrink-0 flex items-center justify-center self-end w-8 h-8 bg-accentCyan/20 text-accentCyan">
                  <Bot size={14} />
                </div>
                <div className="px-4 py-3 bg-bgPrimary border border-white/5 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl flex items-center">
                  <Loader2 size={14} className="text-accentCyan animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-bgPrimary/50">
            <form onSubmit={handleSubmit} className="flex gap-2 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..." 
                className="w-full bg-black/20 border border-white/10 rounded-full px-4 py-2.5 text-sm text-textPrimary focus:outline-none focus:border-accentCyan/50 transition-colors placeholder:text-textSecondary/50 font-mono"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 top-1 bottom-1 px-3 bg-accentCyan hover:bg-accentCyan/90 disabled:bg-accentCyan/30 disabled:cursor-not-allowed text-bgPrimary rounded-full transition-colors flex items-center justify-center"
              >
                <Send size={16} className={`${!input.trim() && 'translate-x-[-2px]'}`} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
