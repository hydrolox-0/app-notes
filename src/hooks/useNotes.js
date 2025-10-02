import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from './useAuth';

export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useNotes: user =', user); // Debug user
    if (!user) {
      console.log('useNotes: No user, exiting');
      setLoading(false); // Allow page to render if no user
      return;
    }

    const notesRef = collection(db, 'notes');
    // Simplified query - just filter by owner, no orderBy to avoid index requirement
    const q = query(notesRef, where('ownerId', '==', user.uid));

    console.log('🔥 Setting up Firestore listener for user:', user.uid);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`🔄 [${timestamp}] Snapshot received! Docs: ${querySnapshot.size}`);
      
      // Check if this is from cache or server
      const source = querySnapshot.metadata.fromCache ? 'cache' : 'server';
      console.log(`📡 Data source: ${source}`);
      
      const notesData = [];
      querySnapshot.forEach((doc) => {
        const noteData = { id: doc.id, ...doc.data() };
        console.log(`📝 Note: ${noteData.title} (updated: ${noteData.updatedAt?.seconds})`);
        notesData.push(noteData);
      });
      
      // Sort by createdAt in JavaScript instead of Firestore
      notesData.sort((a, b) => {
        const aTime = a.createdAt?.seconds || a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.seconds || b.createdAt?.getTime() || 0;
        return bTime - aTime; // Descending order (newest first)
      });
      
      console.log(`✅ [${timestamp}] Setting ${notesData.length} notes in state`);
      setNotes(notesData);
      setLoading(false);
    }, (error) => {
      console.error('❌ Firestore listener error:', error);
      setLoading(false);
    });

    return () => {
      console.log('useNotes: Unsubscribing');
      unsubscribe();
    };
  }, [user]);

  const createNote = async (title = 'New Note', content = '<p>Start typing...</p>') => {
    if (!user) {
      console.log('createNote: No user');
      return;
    }

    const notesRef = collection(db, 'notes');
    const newNote = {
      title,
      content,
      ownerId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('createNote: Creating note =', newNote); // Debug creation
    const docRef = await addDoc(notesRef, newNote);
    console.log('createNote: Created note ID =', docRef.id);
    return docRef.id;
  };

  const updateNote = async (id, title, content) => {
    try {
      const noteRef = doc(db, 'notes', id);
      const timestamp = new Date().toLocaleTimeString();
      console.log(`💾 [${timestamp}] Updating note ${id}:`, { title: title.substring(0, 30) + '...' });
      
      await updateDoc(noteRef, { 
        title, 
        content, 
        updatedAt: new Date() 
      });
      
      console.log(`✅ [${timestamp}] Note ${id} updated successfully`);
    } catch (error) {
      console.error('❌ Error updating note:', error);
    }
  };

  const deleteNote = async (id) => {
    const noteRef = doc(db, 'notes', id);
    console.log('deleteNote: Deleting note ID =', id); // Debug delete
    await deleteDoc(noteRef);
  };

  return { notes, loading, createNote, updateNote, deleteNote };
}