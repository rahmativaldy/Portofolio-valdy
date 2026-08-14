export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  challenges?: string[];
  learnings?: string[];
  link?: string;
  github?: string;
  /** Path relative to /public */
  thumbnail?: string;
  /** Additional gallery images relative to /public */
  gallery?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ContactLink {
  name: string;
  icon: string;
  url: string;
}

export interface BlogNote {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

