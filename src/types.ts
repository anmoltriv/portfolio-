export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  metrics?: { label: string; value: string };
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bulletPoints: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design_tools';
  percentage: number;
}
