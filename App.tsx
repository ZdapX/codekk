
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Info, LogIn, MessageSquare, Shield, User, Search } from 'lucide-react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatSection from './pages/ChatSection';
import Profiles from './pages/Profiles';
import { AdminProfile, Project } from './types';
import { INITIAL_ADMINS, INITIAL_PROJECTS } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [admins, setAdmins] = useState<AdminProfile[]>(INITIAL_ADMINS);

  // Initialize projects from localStorage or default constants
  useEffect(() => {
    const savedProjects = localStorage.getItem('s_hub_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        setProjects(INITIAL_PROJECTS);
      }
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('s_hub_projects', JSON.stringify(INITIAL_PROJECTS));
    }

    if (!localStorage.getItem('visitor_id')) {
      const id = `USER${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem('visitor_id', id);
    }
  }, []);

  // Persist projects whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('s_hub_projects', JSON.stringify(projects));
    }
  }, [projects]);

  return (
    <Router>
      <div className="min-h-screen bg-brand-black text-white selection:bg-brand-red selection:text-white pb-24 md:pb-0">
        <header className="sticky top-0 z-50 bg-brand-black/80 border-b border-brand-red/30 p-4 flex justify-between items-center backdrop-blur-xl">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
            <span className="text-brand-red font-mono group-hover:rotate-12 transition-transform">&lt;/&gt;</span>
            <span className="tracking-tighter uppercase italic">Source Code <span className="text-brand-red not-italic text-sm align-top">HUB</span></span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/profiles" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">
              Our Team
            </Link>
            {currentUser ? (
              <Link to="/admin" className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:scale-105 transition">
                <Shield size={14} /> Dashboard
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-zinc-800 transition">
                <LogIn size={14} /> Login
              </Link>
            )}
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home projects={projects} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} setProjects={setProjects} />} />
            <Route path="/profiles" element={<Profiles admins={admins} />} />
            <Route path="/login" element={<AdminLogin admins={admins} onLogin={setCurrentUser} />} />
            <Route path="/admin" element={<AdminDashboard user={currentUser} setUser={setCurrentUser} projects={projects} setProjects={setProjects} admins={admins} setAdmins={setAdmins} />} />
            <Route path="/chat" element={<ChatSection admins={admins} />} />
          </Routes>
        </main>

        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800 px-10 py-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 border-t-brand-red/50">
          <Link to="/" className="flex flex-col items-center gap-1 group">
            <Search size={22} className="text-zinc-500 group-hover:text-brand-red transition-all" />
            <span className="text-[9px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-red">Browse</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center gap-1 group">
            <MessageSquare size={22} className="text-zinc-500 group-hover:text-brand-red transition-all" />
            <span className="text-[9px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-red">Forum</span>
          </Link>
          <Link to="/profiles" className="flex flex-col items-center gap-1 group">
            <User size={22} className="text-zinc-500 group-hover:text-brand-red transition-all" />
            <span className="text-[9px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-red">Admin</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
