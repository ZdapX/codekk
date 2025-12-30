
export enum ProjectType {
  FILE = 'FILE',
  CODE = 'CODE'
}

export interface AdminProfile {
  id: string;
  username: string;
  name: string;
  role: 'Admin' | 'Owner';
  quote: string;
  hashtags: string[];
  photoUrl: string;
  password?: string;
}

export interface Project {
  id: string;
  name: string;
  language: string;
  type: ProjectType;
  content: string; // File URL or Raw Code
  notes?: string;
  previewUrl: string; // Image URL or Link
  likes: number;
  downloads: number;
  authorId: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'USER-X' or 'ADMIN-ID'
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
