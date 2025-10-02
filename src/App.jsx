// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import NotesPage from './pages/NotesPage';
// import SharedNotePage from './pages/SharedNotePage';

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/notes" element={<NotesPage />} />
//         <Route path="/shared/:noteId" element={<SharedNotePage />} />
//       </Routes>
//     </div>
//   );
// }
// export default App;

import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import SharedNotePage from './pages/SharedNotePage';

function App() {
  return (
    <div className="h-screen" style={{ backgroundColor: 'var(--tt-bg-color)' }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/shared/:noteId" element={<SharedNotePage />} />
      </Routes>
    </div>
  );
}

export default App;