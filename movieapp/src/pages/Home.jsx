import MovieCard from '../components/MovieCard';
import { useState } from 'react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const movies = [
    { id: 1, title: 'Saprophytes', release_date: '2020' },
    { id: 2, title: 'Interstellar', release_date: '2022' },
    { id: 3, title: 'Seven Deadly Kings', release_date: '2024' },
    { id: 4, title: 'Warrior', release_date: '2025' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery('Search for a movie...');
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
