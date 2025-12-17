const movieNameInput = document.getElementById('movieName');
const ratingInput = document.getElementById('rating');
const commentInput = document.getElementById('comment');
const addBtn = document.getElementById('addBtn');
const moviesList = document.getElementById('moviesList');

let movies = [];

function addMovie() {
    const movieName = movieNameInput.value.trim();
    const rating = ratingInput.value.trim();
    const comment = commentInput.value.trim();
    
    if (movieName === '' || rating === '' || comment === '') {
        alert('Please fill in all fields!');
        return;
    }
    
    const movie = {
        id: Date.now(),
        name: movieName,
        rating: rating,
        comment: comment
    };
    
    movies.push(movie);
    
    movieNameInput.value = '';
    ratingInput.value = '';
    commentInput.value = '';
    
    renderMovies();
}

function deleteMovie(id) {
    movies = movies.filter(movie => movie.id !== id);
    renderMovies();
}

function renderMovies() {
    moviesList.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        movieCard.innerHTML = `
            <h3>${movie.name}</h3>
            <p class="rating">Rating: ${movie.rating}/10</p>
            <p class="comment">${movie.comment}</p>
            <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>
        `;
        
        moviesList.appendChild(movieCard);
    });
}

addBtn.addEventListener('click', addMovie);

movieNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addMovie();
    }
});

ratingInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addMovie();
    }
});

commentInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addMovie();
    }
});


