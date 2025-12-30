
import React from 'react';
import { AdminProfile } from '../types';
import { Shield, Crown, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfilesProps {
  admins: AdminProfile[];
}

const Profiles: React.FC<ProfilesProps> = ({ admins }) => {
  return (
    <div className="space-y-12 py-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">The Legends</h1>
        <p className="text-zinc-500 text-sm uppercase tracking-[0.3em] font-bold">Behind the source code</p>
      </div>

      <div className="grid gap-12">
        {admins.map((admin) => (
          <div key={admin.id} className="group relative">
            <div className="absolute -inset-1 bg-brand-red rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 overflow-hidden">
              {/* Role Badge */}
              <div className="absolute top-6 right-6 px-4 py-1.5 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2">
                {admin.role === 'Owner' ? <Crown size={14} /> : <Shield size={14} />}
                {admin.role}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative shrink-0">
                  <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-brand-red shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                    <img src={admin.photoUrl} alt={admin.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-2xl shadow-lg">
                    <Shield size={20} className="fill-black" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">{admin.name}</h2>
                    <p className="text-zinc-500 font-mono text-sm">@{admin.username}</p>
                  </div>
                  
                  <blockquote className="text-xl italic text-zinc-300 font-medium leading-relaxed">
                    "{admin.quote}"
                  </blockquote>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {admin.hashtags.map((tag, i) => (
                      <span key={i} className="text-brand-red font-bold text-sm">#{tag}</span>
                    ))}
                  </div>

                  <Link 
                    to="/chat" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-brand-red hover:text-white transition-all transform active:scale-95"
                  >
                    <MessageSquare size={18} /> Chat with {admin.role}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
