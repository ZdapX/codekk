
import React, { useState, useEffect, useRef } from 'react';
import { AdminProfile } from '../types';
import { Send, User as UserIcon, Shield, ChevronLeft } from 'lucide-react';

interface ChatSectionProps {
  admins: AdminProfile[];
}

interface Message {
  id: string;
  sender: string;
  text: string;
  isAdmin: boolean;
  timestamp: number;
}

const ChatSection: React.FC<ChatSectionProps> = ({ admins }) => {
  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const visitorId = localStorage.getItem('visitor_id') || 'USER1';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedAdmin]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedAdmin) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: visitorId,
      text: inputText,
      isAdmin: false,
      timestamp: Date.now()
    };

    const adminId = selectedAdmin.id;
    const currentChat = messages[adminId] || [];
    const updatedChat = [...currentChat, newMessage];

    setMessages({ ...messages, [adminId]: updatedChat });
    setInputText('');

    // Simulated Admin Response
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedAdmin.name,
        text: `Hello ${visitorId}! Thanks for contacting me. How can I help you with our source codes today?`,
        isAdmin: true,
        timestamp: Date.now()
      };
      setMessages(prev => ({ ...prev, [adminId]: [...(prev[adminId] || []), adminResponse] }));
    }, 1500);
  };

  if (!selectedAdmin) {
    return (
      <div className="space-y-8 py-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">CHAT ADMIN</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Select an expert to message</p>
        </div>

        <div className="grid gap-4">
          {admins.map(admin => (
            <button 
              key={admin.id}
              onClick={() => setSelectedAdmin(admin)}
              className="group flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-[2rem] hover:border-brand-red transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={admin.photoUrl} alt={admin.name} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition duration-500 border border-zinc-800" />
                  <div className="absolute -bottom-1 -right-1 bg-brand-red w-4 h-4 rounded-full border-2 border-zinc-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{admin.name}</h3>
                  <p className="text-zinc-500 text-xs font-mono">@{admin.username}</p>
                </div>
              </div>
              <div className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-brand-red group-hover:text-white transition">
                Start Chat
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentChat = messages[selectedAdmin.id] || [];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex items-center gap-4">
        <button onClick={() => setSelectedAdmin(null)} className="p-2 hover:bg-zinc-800 rounded-xl transition">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <img src={selectedAdmin.photoUrl} className="w-10 h-10 rounded-xl object-cover border border-brand-red" />
          <div>
            <h4 className="font-bold text-sm">{selectedAdmin.name}</h4>
            <span className="text-[10px] text-zinc-500 font-bold uppercase flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" /> Online
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentChat.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20 pointer-events-none">
            <Shield size={60} className="text-brand-red mb-4" />
            <p className="font-black uppercase tracking-widest">End-to-End Encrypted</p>
          </div>
        ) : (
          currentChat.map(msg => (
            <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.isAdmin ? 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800' : 'bg-brand-red text-white rounded-tr-none shadow-[0_5px_15px_rgba(255,0,0,0.2)]'}`}>
                <p className="mb-1">{msg.text}</p>
                <p className={`text-[8px] font-bold uppercase tracking-widest ${msg.isAdmin ? 'text-zinc-600' : 'text-white/50'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
        <input 
          type="text" 
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 text-sm focus:outline-none focus:border-brand-red transition-all"
        />
        <button type="submit" className="p-4 bg-brand-red text-white rounded-2xl hover:bg-brand-darkRed active:scale-90 transition shadow-lg">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
