
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Download, Copy, Check, ExternalLink, Code2, FileBox } from 'lucide-react';
import { Project, ProjectType } from '../types';

interface ProjectDetailProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects, setProjects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-brand-red underline">Back to home</button>
      </div>
    );
  }

  const handleLike = () => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setProjects(updated);
    localStorage.setItem('s_hub_projects', JSON.stringify(updated));
  };

  const handleDownload = () => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, downloads: p.downloads + 1 } : p
    );
    setProjects(updated);
    localStorage.setItem('s_hub_projects', JSON.stringify(updated));

    if (project.type === ProjectType.CODE) {
      const element = document.createElement('a');
      const file = new Blob([project.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${project.name}-${project.language.toLowerCase()}.txt`;
      document.body.appendChild(element);
      element.click();
    } else {
      window.open(project.content, '_blank');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(project.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-white transition group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      {/* Header Info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">{project.name}</h1>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-full uppercase tracking-widest">
                {project.language}
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-full uppercase tracking-widest">
                {project.type}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleLike}
              className="flex flex-col items-center p-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition group"
            >
              <Heart size={24} className="text-brand-red group-hover:fill-brand-red transition" />
              <span className="text-xs font-bold mt-1">{project.likes}</span>
            </button>
            <div className="flex flex-col items-center p-3 bg-zinc-800 rounded-2xl">
              <Download size={24} className="text-white" />
              <span className="text-xs font-bold mt-1">{project.downloads}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {project.previewUrl && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Preview / Demo</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg aspect-video relative group">
            {project.previewUrl.startsWith('http') && !project.previewUrl.includes('cloudinary') ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-900">
                <ExternalLink size={48} className="text-brand-red mb-4" />
                <p className="text-lg font-bold mb-4">External Preview Link</p>
                <a 
                  href={project.previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand-red text-white font-bold rounded-xl hover:scale-105 transition"
                >
                  Visit Preview Website
                </a>
              </div>
            ) : (
              <img 
                src={project.previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {project.notes && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Developer Notes</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 italic text-zinc-300">
            "{project.notes}"
          </div>
        </div>
      )}

      {/* Code/File Card */}
      <div className="space-y-2">
        <div className="flex justify-between items-center ml-4 pr-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Source Content</p>
          {project.type === ProjectType.CODE && (
            <button onClick={copyToClipboard} className="text-brand-red text-[10px] font-bold uppercase flex items-center gap-1">
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          )}
        </div>
        <div className="bg-zinc-950 border border-brand-red/20 rounded-3xl p-6 font-mono text-sm overflow-x-auto min-h-[150px] relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          {project.type === ProjectType.CODE ? (
            <pre className="text-zinc-300 whitespace-pre-wrap">{project.content}</pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-8">
              <FileBox size={40} className="text-brand-red mb-2" />
              <p className="text-zinc-500 font-sans font-bold">Project packed in archive file</p>
              <p className="text-zinc-700 font-sans text-xs uppercase tracking-widest">Click download button below to get file</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Action */}
      <button 
        onClick={handleDownload}
        className="w-full py-5 bg-brand-red text-white font-black text-xl rounded-3xl uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-brand-darkRed active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,0,0,0.3)]"
      >
        <Download size={24} /> Download Now
      </button>
    </div>
  );
};

export default ProjectDetail;
