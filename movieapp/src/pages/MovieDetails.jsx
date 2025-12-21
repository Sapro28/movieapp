import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits } from '../services/api';
import './styles/MovieDetails';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
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

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div style={{ padding: 20 }}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {movie && <h2>{movie.title}</h2>}
      {movie?.overview && <p>{movie.overview}</p>}
      {movie?.release_date && (
        <p>
          <strong>Released:</strong> {movie.release_date}
        </p>
      )}
      {credits?.cast?.[0] && <p>Top cast: {credits.cast[0].name}</p>}

      {genreText && (
        <p>
          <strong>Genre:</strong> {genreText}
        </p>
      )}

      {movie?.runtime && (
        <p>
          <strong>Duration:</strong> {movie.runtime} min
        </p>
      )}

      {countryText && (
        <p>
          <strong>Country:</strong> {countryText}
        </p>
      )}

      {productionText && (
        <p>
          <strong>Production:</strong> {productionText}
        </p>
      )}

      {castText && (
        <p>
          <strong>Casts:</strong> {castText}
        </p>
      )}
    </div>
  );
}

export default MovieDetails;
