
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Download, Code2, FileCode, Users } from 'lucide-react';
import { Project, ProjectType } from '../types';
import { INITIAL_ADMINS } from '../constants';

interface HomeProps {
  projects: Project[];
}

const Home: React.FC<HomeProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.language.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.createdAt - a.createdAt);

  const getAuthorName = (id: string) => {
    const admin = INITIAL_ADMINS.find(a => a.id === id);
    return admin ? admin.name : 'System';
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">
          Explore <span className="text-brand-red">Source Code</span>
        </h1>
        <p className="text-zinc-500 max-w-lg mx-auto text-sm font-medium leading-relaxed">
          The ultimate vault for free project source codes, curated by top developers. 
          Download, learn, and build your next masterpiece.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search size={22} className="text-zinc-600" />
        </div>
        <input
          type="text"
          placeholder="Search by project name or language..."
          className="w-full bg-zinc-900/50 border-2 border-zinc-800/80 rounded-[2rem] py-5 pl-14 pr-6 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-red focus:bg-zinc-900 transition-all shadow-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-2 right-2 px-6 bg-zinc-800 rounded-[1.5rem] flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
          Public Database
        </div>
      </div>

      {/* Projects List */}
      <div className="grid gap-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/30 rounded-[3rem] border border-zinc-800/50 border-dashed">
            <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-zinc-700">
              <Search size={40} />
            </div>
            <p className="text-zinc-500 text-xl font-bold">No results found for your search.</p>
            <p className="text-zinc-700 text-xs mt-2 uppercase tracking-[0.3em] font-black">Try different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                to={`/project/${project.id}`}
                className="group relative flex flex-col p-8 bg-zinc-900/40 hover:bg-zinc-900 rounded-[2.5rem] border border-zinc-800 hover:border-brand-red transition-all duration-500 shadow-xl overflow-hidden"
              >
                {/* Visual Flair */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-red/5 rounded-full blur-2xl group-hover:bg-brand-red/10 transition-colors" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                      {project.type === ProjectType.CODE ? <Code2 size={28} /> : <FileCode size={28} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-brand-red transition-colors">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded text-[9px] font-black uppercase tracking-widest">
                          {project.language}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                          <Users size={10} /> {getAuthorName(project.authorId)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-zinc-500 text-sm line-clamp-2 mb-6 font-medium">
                    {project.notes || "No additional developer notes provided for this project."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
                  <div className="flex gap-6">
                    <div className="flex flex-col">
                      <span className="text-brand-red text-xl font-black tracking-tighter">{project.likes}</span>
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Likes</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-xl font-black tracking-tighter">{project.downloads}</span>
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Usage</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    View Project
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
