
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Info, LogIn, Upload, MessageSquare, ChevronLeft, Heart, Download, User, Edit2, Shield, Trash2 } from 'lucide-react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatSection from './pages/ChatSection';
import Profiles from './pages/Profiles';
import { AdminProfile, Project } from './types';
import { INITIAL_ADMINS } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [admins, setAdmins] = useState<AdminProfile[]>(INITIAL_ADMINS);

  // Auto-generate User ID for visitors
  useEffect(() => {
    if (!localStorage.getItem('visitor_id')) {
      const id = `USER${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem('visitor_id', id);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-brand-black text-white selection:bg-brand-red selection:text-white pb-20 md:pb-0">
        <header className="sticky top-0 z-50 bg-brand-black border-b border-brand-red/30 p-4 flex justify-between items-center backdrop-blur-md">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-brand-red font-mono">&lt;/&gt;</span>
            <span className="tracking-tighter uppercase italic">Source Code</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/profiles" className="p-2 bg-brand-red text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,0,0.5)]">
              <Info size={20} className="fill-white" />
            </Link>
            {currentUser ? (
              <Link to="/admin" className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                <Shield size={16} /> Dash
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition">
                <LogIn size={16} /> Admin
              </Link>
            )}
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home projects={projects} setProjects={setProjects} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} setProjects={setProjects} />} />
            <Route path="/profiles" element={<Profiles admins={admins} />} />
            <Route path="/login" element={<AdminLogin admins={admins} onLogin={setCurrentUser} />} />
            <Route path="/admin" element={<AdminDashboard user={currentUser} setUser={setCurrentUser} projects={projects} setProjects={setProjects} admins={admins} setAdmins={setAdmins} />} />
            <Route path="/chat" element={<ChatSection admins={admins} />} />
          </Routes>
        </main>

        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 px-8 py-4 rounded-full shadow-2xl z-50 border-t-brand-red">
          <Link to="/" className="flex flex-col items-center gap-1 group">
            <Search size={22} className="group-hover:text-brand-red transition-colors" />
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-brand-red">Home</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center gap-1 group">
            <MessageSquare size={22} className="group-hover:text-brand-red transition-colors" />
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-brand-red">Chat</span>
          </Link>
          <Link to="/profiles" className="flex flex-col items-center gap-1 group">
            <User size={22} className="group-hover:text-brand-red transition-colors" />
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-brand-red">Admin</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
