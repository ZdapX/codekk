
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Code2, FileCode, Plus, Trash2, Edit2, LogOut, Image, Link as LinkIcon, Save, Key } from 'lucide-react';
import { AdminProfile, Project, ProjectType } from '../types';

interface AdminDashboardProps {
  user: AdminProfile | null;
  setUser: (user: AdminProfile | null) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  admins: AdminProfile[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminProfile[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, setUser, projects, setProjects, admins, setAdmins }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upload' | 'profile' | 'manage'>('upload');
  
  // Upload State
  const [projName, setProjName] = useState('');
  const [projType, setProjType] = useState<ProjectType>(ProjectType.CODE);
  const [projLang, setProjLang] = useState('');
  const [projContent, setProjContent] = useState('');
  const [projNotes, setProjNotes] = useState('');
  const [projPreview, setProjPreview] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(user?.name || '');
  const [editQuote, setEditQuote] = useState(user?.quote || '');
  const [editTags, setEditTags] = useState(user?.hashtags.join(' ') || '');
  const [editPhoto, setEditPhoto] = useState(user?.photoUrl || '');
  
  // Password State
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now().toString(),
      name: projName,
      language: projLang,
      type: projType,
      content: projContent,
      notes: projNotes,
      previewUrl: projPreview,
      likes: 0,
      downloads: 0,
      authorId: user.id,
      createdAt: Date.now()
    };
    
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem('s_hub_projects', JSON.stringify(updated));
    
    // Reset form
    setProjName('');
    setProjContent('');
    setProjLang('');
    setProjNotes('');
    setProjPreview('');
    alert('Project Uploaded Successfully!');
    setActiveTab('manage');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('s_hub_projects', JSON.stringify(updated));
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAdmins = admins.map(a => 
      a.id === user.id ? { 
        ...a, 
        name: editName, 
        quote: editQuote, 
        hashtags: editTags.split(' ').filter(t => t.startsWith('#') ? t.substring(1) : t),
        photoUrl: editPhoto
      } : a
    );
    setAdmins(updatedAdmins);
    const updatedUser = updatedAdmins.find(a => a.id === user.id);
    if (updatedUser) setUser(updatedUser);
    alert('Profile Updated!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPass !== user.password) {
      setPassMsg('Incorrect old password');
      return;
    }
    const updatedAdmins = admins.map(a => 
      a.id === user.id ? { ...a, password: newPass } : a
    );
    setAdmins(updatedAdmins);
    setPassMsg('Password updated successfully!');
    setOldPass('');
    setNewPass('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800">
        <div className="flex items-center gap-4">
          <img src={user.photoUrl} className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-red" />
          <div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">{user.role}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-3 bg-zinc-800 text-zinc-400 hover:text-brand-red rounded-2xl transition">
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-zinc-900 rounded-2xl border border-zinc-800">
        {(['upload', 'manage', 'profile'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-brand-red text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'upload' && (
        <form onSubmit={handleUpload} className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Project Name</label>
              <input required value={projName} onChange={e => setProjName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" placeholder="My Awesome Web App" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Language</label>
              <input required value={projLang} onChange={e => setProjLang(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" placeholder="React, Node.js, Python..." />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Type</label>
            <div className="flex gap-4">
              <button type="button" onClick={() => setProjType(ProjectType.CODE)} className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border ${projType === ProjectType.CODE ? 'bg-brand-red border-brand-red text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}>
                <Code2 size={20} /> Code Paste
              </button>
              <button type="button" onClick={() => setProjType(ProjectType.FILE)} className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border ${projType === ProjectType.FILE ? 'bg-brand-red border-brand-red text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}>
                <FileCode size={20} /> File URL
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">{projType === ProjectType.CODE ? 'Paste Source Code' : 'Direct Link to File (Cloudinary/Drive/etc)'}</label>
            <textarea required value={projContent} onChange={e => setProjContent(e.target.value)} className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none font-mono text-sm" placeholder={projType === ProjectType.CODE ? '<html>...</html>' : 'https://api.cloudinary.com/v1_1/...'} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Preview (Image Link or Demo URL)</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input value={projPreview} onChange={e => setProjPreview(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:border-brand-red outline-none" placeholder="https://example.com/demo or image.png" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Developer Notes (Optional)</label>
            <textarea value={projNotes} onChange={e => setProjNotes(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none h-20" placeholder="Special instructions or feature list..." />
          </div>

          <button type="submit" className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-[1.5rem] hover:bg-brand-red hover:text-white transition-all shadow-xl active:scale-95">
            Launch Project
          </button>
        </form>
      )}

      {activeTab === 'manage' && (
        <div className="space-y-4">
          <h3 className="text-xl font-black uppercase tracking-tighter">Your Projects</h3>
          <div className="grid gap-3">
            {projects.filter(p => p.authorId === user.id).map(p => (
              <div key={p.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center group">
                <div>
                  <h4 className="font-bold">{p.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{p.language} • {p.type}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(p.id)} className="p-2 bg-zinc-800 text-zinc-500 hover:text-brand-red rounded-xl transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-8">
          <form onSubmit={handleUpdateProfile} className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2"><Edit2 size={20} className="text-brand-red" /> Edit Profile</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Display Name</label>
              <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Quotes</label>
              <textarea value={editQuote} onChange={e => setEditQuote(e.target.value)} className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Hashtags (Space separated)</label>
              <input value={editTags} onChange={e => setEditTags(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" placeholder="#webdev #pro" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Profile Photo URL</label>
              <input value={editPhoto} onChange={e => setEditPhoto(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" />
            </div>

            <button type="submit" className="w-full py-4 bg-brand-red text-white font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition shadow-lg flex items-center justify-center gap-2">
              <Save size={18} /> Save Profile Changes
            </button>
          </form>

          <form onSubmit={handleChangePassword} className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2"><Key size={20} className="text-brand-red" /> Security</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">Old Password</label>
                <input type="password" value={oldPass} onChange={e => setOldPass(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-4">New Password</label>
                <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-brand-red outline-none" />
              </div>
            </div>

            {passMsg && <p className={`text-center text-sm font-bold ${passMsg.includes('success') ? 'text-green-500' : 'text-brand-red'}`}>{passMsg}</p>}

            <button type="submit" className="w-full py-4 bg-zinc-800 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-700 transition">
              Update Security Code
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
