import { auth } from '@/config/firebase';

/**
 * Middleware to require authentication for write operations
 * This should be used before any Firestore write operations
 */
export async function requireAuth(): Promise<boolean> {
  if (!auth) {
    throw new Error('Firebase auth not initialized');
  }
  
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Authentication required. Please sign in to perform this action.');
  }
  return true;
}

/**
 * Check if user is authenticated without throwing
 */
export function isAuthenticated(): boolean {
  return auth?.currentUser !== null && auth?.currentUser !== undefined;
}
