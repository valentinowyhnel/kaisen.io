export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  linkedin: string;
  github: string;
  email: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform' | 'database';
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  certificates: Certificate[];
  skills: Skill[];
}
