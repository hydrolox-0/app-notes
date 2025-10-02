import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/Editor';
import { useNotes } from '../hooks/useNotes';
import React, { useState } from 'react';

function NotesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState(null);
  const saveTimeoutRef = React.useRef(null);

  // Debug logging
  console.log('🔍 NotesPage render:');
  console.log('  - notes count:', notes.length);
  console.log('  - selectedNote:', selectedNote?.id, selectedNote?.title);
  console.log('  - selectedNote content length:', selectedNote?.content?.length);
  
  // Find the current note in the notes array
  const currentNoteInArray = selectedNote ? notes.find(n => n.id === selectedNote.id) : null;
  if (currentNoteInArray && selectedNote) {
    console.log('  - Note in array content length:', currentNoteInArray.content?.length);
    console.log('  - Content match:', currentNoteInArray.content === selectedNote.content);
  }

  // CRITICAL: Sync selectedNote with Firestore updates
  React.useEffect(() => {
    if (selectedNote && notes.length > 0) {
      const updatedNote = notes.find(note => note.id === selectedNote.id);
      if (updatedNote && updatedNote.content !== selectedNote.content) {
        console.log('🔄 SYNCING selectedNote with Firestore update!');
        console.log('  - Old content length:', selectedNote.content?.length);
        console.log('  - New content length:', updatedNote.content?.length);
        setSelectedNote(updatedNote);
      }
    }
  }, [notes]); // Only depend on notes array

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center h-screen" 
        style={{ backgroundColor: 'var(--tt-bg-color)', color: 'var(--tt-theme-text)' }}
      >
        Loading notes...
      </div>
    );
  }

  if (!user) {
    navigate('/');
    return null;
  }

  const handleCreateNote = async () => {
    try {
      const initialContent = '<h1>Untitled</h1><p>Start typing...</p>';
      const newId = await createNote('Untitled', initialContent);
      
      // Create a temporary note object to select immediately
      const tempNote = { 
        id: newId, 
        title: 'Untitled', 
        content: initialContent
      };
      setSelectedNote(tempNote);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const extractTitleFromContent = (htmlContent) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Try to find the first heading
    const heading = tempDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && heading.textContent.trim()) {
      return heading.textContent.trim();
    }
    
    // If no heading, use the first paragraph
    const paragraph = tempDiv.querySelector('p');
    if (paragraph && paragraph.textContent.trim()) {
      const text = paragraph.textContent.trim();
      // Limit to first 50 characters for title
      return text.length > 50 ? text.substring(0, 50) + '...' : text;
    }
    
    // Fallback to "Untitled"
    return 'Untitled';
  };

  const handleUpdateNote = (newContent) => {
    if (selectedNote) {
      // Extract title from content
      const newTitle = extractTitleFromContent(newContent);
      
      // Update the local state immediately (for responsive UI)
      setSelectedNote({ ...selectedNote, content: newContent, title: newTitle });
      
      // Clear existing save timeout
      clearTimeout(saveTimeoutRef.current);
      
      // Debounce the Firebase update (3 seconds)
      saveTimeoutRef.current = setTimeout(() => {
        console.log('💾 Saving to Firebase after 3 seconds of no typing');
        updateNote(selectedNote.id, newTitle, newContent);
      }, 3000);
    }
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="h-screen grid grid-cols-12" style={{ backgroundColor: 'var(--tt-bg-color)' }}>
      {/* Left Sidebar - Notes List (25% width) */}
      <div 
        className="col-span-3 border-r overflow-y-auto"
        style={{ 
          backgroundColor: 'var(--tt-card-bg-color)',
          borderColor: 'var(--tt-border-color)'
        }}
      >
        <div className="p-4">
          <button
            onClick={handleCreateNote}
            className="w-full mb-4 px-4 py-2 rounded-md transition-colors"
            style={{ 
              backgroundColor: 'var(--tt-brand-color-500)',
              color: 'white'
            }}
          >
            Create New Note
          </button>
          
          <h2 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--tt-theme-text)' }}
          >
            Notes
          </h2>
          
          {notes.length === 0 ? (
            <p style={{ color: 'var(--tt-theme-text)' }}>
              No notes yet. Create one!
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className={`p-3 mb-2 rounded-md cursor-pointer transition-colors ${
                  selectedNote?.id === note.id ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: selectedNote?.id === note.id 
                    ? 'var(--tt-brand-color-100)' 
                    : 'var(--tt-card-bg-color)',
                  borderColor: selectedNote?.id === note.id 
                    ? 'var(--tt-brand-color-500)' 
                    : 'var(--tt-border-color)',
                  border: '1px solid'
                }}
                onClick={() => handleSelectNote(note)}
              >
                <p 
                  className="font-medium truncate"
                  style={{ color: 'var(--tt-theme-text)' }}
                >
                  {note.title}
                </p>
                <p 
                  className="text-sm mt-1"
                  style={{ color: 'var(--tt-theme-text)', opacity: 0.7 }}
                >
                  {note.createdAt?.seconds 
                    ? new Date(note.createdAt.seconds * 1000).toLocaleDateString()
                    : 'Just now'
                  }
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                  className="text-sm mt-2 px-2 py-1 rounded transition-colors"
                  style={{ 
                    color: 'var(--tt-color-red-base)',
                    backgroundColor: 'var(--tt-color-red-inc-5)'
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Editor (75% width) */}
      <div className="col-span-9">
        {selectedNote ? (
          <Editor 
            key={selectedNote.id}
            content={selectedNote.content} 
            onUpdate={handleUpdateNote}
          />
        ) : (
          <div 
            className="flex items-center justify-center h-full"
            style={{ 
              backgroundColor: 'var(--tt-bg-color)',
              color: 'var(--tt-theme-text)'
            }}
          >
            <p className="text-lg">Select a note to edit or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;