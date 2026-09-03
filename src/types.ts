export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  /** Engineering specifics, rendered as bullets in the project modal. */
  highlights: string[];
  /** Imported screenshot shown on the card and in the modal. */
  image: string;
  tags: string[];
  metrics?: { label: string; value: string };
  demoLink?: string;
  repos: ProjectLink[];
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
