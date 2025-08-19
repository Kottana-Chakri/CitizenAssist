export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string; // typically the lowercased email
  name: string;
  email: string;
  createdAt: number;
}
