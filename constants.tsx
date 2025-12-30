
import React from 'react';
import { AdminProfile, Project, ProjectType } from './types';

export const CLOUDINARY_CONFIG = {
  cloud_name: 'dnb0q2s2h',
  api_key: '838368993294916',
  api_secret: 'N9U1eFJGKjJ-A8Eo4BTtSCl720c'
};

export const INITIAL_ADMINS: AdminProfile[] = [
  {
    id: 'admin-1',
    username: 'Silverhold',
    name: 'SilverHold Official',
    role: 'Admin',
    quote: 'Jangan lupa sholat walaupun kamu seorang pendosa allah lebih suka orang pendosa yang sering bertaubat dari pada orang yang merasa suci',
    hashtags: ['bismillahcalonustad'],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    password: 'Rian'
  },
  {
    id: 'admin-2',
    username: 'BraynOfficial',
    name: 'Brayn Official',
    role: 'Owner',
    quote: 'Tidak Semua Orang Suka Kita Berkembang Pesat!',
    hashtags: ['backenddev', 'frontenddev', 'BraynOfficial'],
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    password: 'Plerr321'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Modern Portfolio Template',
    language: 'React + Tailwind',
    type: ProjectType.CODE,
    content: 'const Portfolio = () => {\n  return <div>My Amazing Work</div>\n};',
    notes: 'A clean and responsive portfolio template for developers.',
    previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    likes: 124,
    downloads: 450,
    authorId: 'admin-2',
    createdAt: Date.now() - 86400000
  },
  {
    id: 'p2',
    name: 'E-Commerce Backend API',
    language: 'Node.js',
    type: ProjectType.CODE,
    content: 'app.get("/products", (req, res) => {\n  res.json(products);\n});',
    notes: 'Ready-to-use REST API for online stores.',
    previewUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    likes: 89,
    downloads: 210,
    authorId: 'admin-1',
    createdAt: Date.now() - 172800000
  }
];

export const COLORS = {
  primary: '#FF0000',
  background: '#000000',
  white: '#FFFFFF'
};
