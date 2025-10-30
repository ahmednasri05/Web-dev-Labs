import React, { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const addMovie = () => {
    if (movieName.trim() === '' || rating.trim() === '' || comment.trim() === '') {
      alert('Please fill in all fields!');
      return;
    }

    const newMovie = {
      id: Date.now(),
      name: movieName,
      rating: rating,
      comment: comment
    };

    setMovies([...movies, newMovie]);
    setMovieName('');
    setRating('');
    setComment('');
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="container">
      <h1>Movie Collection</h1>
      
      <div className="input-section">
        <input
          type="text"
          placeholder="Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Rating (1-10)"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        
        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.name}</h3>
            <p className="rating">Rating: {movie.rating}/10</p>
            <p className="comment">{movie.comment}</p>
            <button 
              className="delete-btn" 
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

