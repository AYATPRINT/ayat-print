import React from 'react';
import ReactDOM from 'react-dom/client';
import FabricCanvas from './engine/FabricCanvas';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-amber-400">🎨 AyatStudio Canvas Editor</h1>
        <p className="text-sm text-stone-400">Open-source Canva alternative for Islamic Art & Custom Posters</p>
      </header>
      <main className="w-full max-w-5xl flex justify-center">
        <FabricCanvas width={800} height={600} initialText="Surah An-Nas" />
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
