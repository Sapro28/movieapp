import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits } from '../services/api';
import '../styles/MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const creditsData = await getMovieCredits(id);
        setCredits(creditsData);
      } catch (err) {
        console.log(err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const genreText = movie?.genres?.map((g) => g.name).join(', ');
  const countryText = movie?.production_countries
    ?.map((c) => c.name)
    .join(', ');
  const productionText = movie?.production_companies
    ?.map((p) => p.name)
    .join(', ');
  const castText = credits?.cast
    ?.slice(0, 5)
    .map((p) => (p.character ? `${p.name} as ${p.character}` : p.name))
    .join(', ');

  return (
    <div className="movie-details-page">
      {loading && <div className="movie-details-status">Loading...</div>}
      {error && <div className="movie-details-error">{error}</div>}

      {movie && !loading && !error && (
        <div className="movie-details-layout">
          <div className="movie-details-left">
            <h2 className="movie-details-title">{movie.title}</h2>

            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} className="movie-poster" />
            ) : (
              <div className="movie-poster-fallback">No poster</div>
            )}
          </div>

          <div className="movie-details-right">
            {movie.overview && (
              <p className="movie-overview">{movie.overview}</p>
            )}

            <div className="movie-meta-list">
              {movie.release_date && (
                <p className="movie-meta">
                  <strong>Released:</strong> {movie.release_date}
                </p>
              )}

              {genreText && (
                <p className="movie-meta">
                  <strong>Genre:</strong> {genreText}
                </p>
              )}

              {movie.runtime && (
                <p className="movie-meta">
                  <strong>Duration:</strong> {movie.runtime} min
                </p>
              )}

              {countryText && (
                <p className="movie-meta">
                  <strong>Country:</strong> {countryText}
                </p>
              )}

              {productionText && (
                <p className="movie-meta">
                  <strong>Production:</strong> {productionText}
                </p>
              )}

              {castText && (
                <p className="movie-meta">
                  <strong>Casts:</strong> {castText}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
