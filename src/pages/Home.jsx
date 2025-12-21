import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError('Failed to load movies...');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (loading) return;

    const query = searchQuery.trim();
    setLoading(true);

    try {
      if (!query) {
        const defaultMovies = await getPopularMovies();
        setMovies(defaultMovies);
        setError(null);
        return;
      }

      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError('Failed to search for movie...');
      console.log(err);
    } finally {
      setLoading(false);
    }
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
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
