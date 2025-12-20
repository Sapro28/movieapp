import '../styles/Favorites.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { favorites } = useMovieContext();
  return (
    <>
      {favorites.length > 0 ? (
        <div className="favorites">
          <h2 className="fav-title">Your Favorites</h2>
          <div className="movies-grid favorites-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="favorites-empty">
          <h2>No Favorite movies yet</h2>
          <p>Favorite your movies to have them close by!</p>
        </div>
      )}
    </>
  );
}

export default Favorites;
