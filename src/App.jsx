import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// function App() {
//   return (
//     <div className="bg-blue-500 text-white p-4">
//       <h1 className="text-2xl">Hello, Tailwind!</h1>
//     </div>
//   );
// }
// export default App;

// function App() {
//   return (
//     <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700">
//       <h1 className="text-2xl font-bold underline">Hello, Tailwind!</h1>
//       <p className="mt-2 text-sm text-blue-200">Testing Tailwind CSS</p>
//     </div>
//   );
// }
// export default App;

// function App() {
//   return (
//     <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700">
//       <h1 className="text-4xl font-bold underline text-teal-400 animate-bounce">Hello, Tailwind!</h1>
//       <p className="mt-2 text-sm text-blue-200">Testing Tailwind CSS</p>
//       <div className="bg-blue-500 text-white p-4 sm:bg-green-500 lg:text-5xl">
//   <h1 className="text-4xl font-bold">Responsive Test</h1>
// </div>
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
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/shared/:noteId" element={<SharedNotePage />} />
      </Routes>
    </div>
  );
}
export default App;

// function App() {
//   return (
//     <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700">
//       <h1 className="text-4xl font-bold underline text-teal-400 animate-bounce">Hello, Tailwind!</h1>
//       <p className="mt-2 text-sm text-blue-200">Testing Tailwind CSS</p>
//     </div>
//   );
// }
// export default App;