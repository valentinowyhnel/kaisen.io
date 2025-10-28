'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, DocumentData, Query } from 'firebase/firestore';
import { db } from '@/config/firebase';

export function useCollection<T = DocumentData>(
  collectionName: string,
  queryConstraints?: Query<DocumentData>
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!db) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const collectionRef = collection(db, collectionName);
    const q = queryConstraints || collectionRef;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching collection:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryConstraints]);

  return { data, loading, error };
}
