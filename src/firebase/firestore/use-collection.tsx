// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type WithId<T> = T & { id: string };

export function useCollection<T = any>(
    memoizedTargetRefOrQuery: any
): { data: WithId<T>[] | null; isLoading: boolean; error: any } {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot) => {
        const results = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(results);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
        errorEmitter.emit('permission-error', new FirestorePermissionError({ operation: 'list', path: 'collection' }));
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]);

  return { data, isLoading, error };
}
