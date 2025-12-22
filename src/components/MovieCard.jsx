import '../styles/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  function onFavorite(e) {
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function viewDetails() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className="movie-card" onClick={viewDetails}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavorite}
          >
            <span className="heart">♥</span>
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
