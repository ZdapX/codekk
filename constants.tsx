
import React from 'react';
import { AdminProfile } from './types';

export const CLOUDINARY_CONFIG = {
  cloud_name: 'dnb0q2s2h',
  api_key: '838368993294916',
  api_secret: 'N9U1eFJGKjJ-A8Eo4BTtSCl720c'
};

export const MONGODB_URI = 'mongodb+srv://braynofficial66_db_user:Oh2ivMc2GGP0SbJF@cluster0.zi2ra3a.mongodb.net/website_db?retryWrites=true&w=majority&appName=Cluster0';

export const INITIAL_ADMINS: AdminProfile[] = [
  {
    id: 'admin-1',
    username: 'Silverhold',
    name: 'SilverHold Official',
    role: 'Admin',
    quote: 'Jangan lupa sholat walaupun kamu seorang pendosa allah lebih suka orang pendosa yang sering bertaubat dari pada orang yang merasa suci',
    hashtags: ['bismillahcalonustad'],
    photoUrl: 'https://picsum.photos/seed/silver/400',
    password: 'Rian'
  },
  {
    id: 'admin-2',
    username: 'BraynOfficial',
    name: 'Brayn Official',
    role: 'Owner',
    quote: 'Tidak Semua Orang Suka Kita Berkembang Pesat!',
    hashtags: ['backenddev', 'frontenddev', 'BraynOfficial'],
    photoUrl: 'https://picsum.photos/seed/brayn/400',
    password: 'Plerr321'
  }
];

export const COLORS = {
  primary: '#FF0000',
  background: '#000000',
  white: '#FFFFFF'
};
