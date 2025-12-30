
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';
import { AdminProfile } from '../types';

interface AdminLoginProps {
  admins: AdminProfile[];
  onLogin: (user: AdminProfile) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ admins, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = admins.find(a => a.username === username && a.password === password);
    if (user) {
      onLogin(user);
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-red" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-red">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Access</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mt-1">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-red transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-red transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-brand-red text-center text-sm font-bold">{error}</p>}

          <button 
            type="submit"
            className="w-full py-4 bg-brand-red text-white font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all active:scale-95 shadow-[0_10px_30px_rgba(255,0,0,0.2)]"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
