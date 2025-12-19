import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import MovieCard from './components/MovieCard';
import './App.css';

function App() {
  return (
    <>
      <MovieCard
        movie={{ title: 'Saprophytes', release_date: '2025', url: 'sapro.com' }}
      />
    </>
  );
}

export default App;
