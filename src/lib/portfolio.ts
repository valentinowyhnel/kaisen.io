import { db } from '@/config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { requireAuth } from './requireAuth';

export interface PortfolioData {
  id?: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  updatedAt: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential?: string;
}

/**
 * Update portfolio data (requires authentication)
 */
export async function updatePortfolio(data: Partial<PortfolioData>): Promise<void> {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  await requireAuth();
  
  const portfolioRef = doc(db, 'portfolio', 'main');
  await setDoc(portfolioRef, {
    ...data,
    updatedAt: Date.now(),
  }, { merge: true });
}

/**
 * Get portfolio data (public read)
 */
export async function getPortfolio(): Promise<PortfolioData | null> {
  if (!db) {
    return null;
  }
  
  const portfolioRef = doc(db, 'portfolio', 'main');
  const snapshot = await getDoc(portfolioRef);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as PortfolioData;
  }
  
  return null;
}

/**
 * Add or update a project (requires authentication)
 */
export async function updateProject(project: Project): Promise<void> {
  await requireAuth();
  
  const portfolio = await getPortfolio();
  if (!portfolio) {
    throw new Error('Portfolio not initialized');
  }
  
  const projects = portfolio.projects || [];
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }
  
  await updatePortfolio({ projects });
}

/**
 * Delete a project (requires authentication)
 */
export async function deleteProject(projectId: string): Promise<void> {
  await requireAuth();
  
  const portfolio = await getPortfolio();
  if (!portfolio) {
    throw new Error('Portfolio not initialized');
  }
  
  const projects = portfolio.projects.filter(p => p.id !== projectId);
  await updatePortfolio({ projects });
}
