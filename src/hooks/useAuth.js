import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, signInWithGoogle, logout };
}