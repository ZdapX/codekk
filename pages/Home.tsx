
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Download, Code2, FileCode } from 'lucide-react';
import { Project, ProjectType } from '../types';

interface HomeProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const Home: React.FC<HomeProps> = ({ projects, setProjects }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Persist projects in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('s_hub_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load projects");
      }
    }
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.language.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-zinc-500" />
        </div>
        <input
          type="text"
          placeholder="Search projects by name or language..."
          className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-red transition-all shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Projects List */}
      <div className="grid gap-4">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800/50 border-dashed">
            <p className="text-zinc-500 font-medium">No projects found yet.</p>
            <p className="text-zinc-700 text-sm mt-1 uppercase tracking-widest">Wait for admins to upload.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-brand-red transition-all hover:scale-[1.01] shadow-xl relative overflow-hidden"
            >
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                  {project.type === ProjectType.CODE ? <Code2 size={24} /> : <FileCode size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{project.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded text-[10px] font-bold uppercase tracking-wider">
                      {project.language}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-800 w-full sm:w-auto">
                <div className="flex flex-col items-center">
                  <span className="text-brand-red text-lg font-bold">{project.likes}</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Likes</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white text-lg font-bold">{project.downloads}</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Downloads</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
