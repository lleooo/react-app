// get type api : https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US
export const movieType = new Map([
    [28, "Action"],
    [12, "Adventure"],
    [16, "Animation"],
    [35, "Comedy"],
    [80, "Crime"],
    [99, "Documentary"],
    [18, "Drama"],
    [10751, "Family"],
    [14, "Fantasy"],
    [36, "History"],
    [27, "Horror"],
    [10402, "Music"],
    [9648, "Mystery"],
    [10749, "Romance"],
    [878, "Science Fiction"],
    [10770, "TV Movie"],
    [53, "Thriller"],
    [10752, "War"],
    [37, "Western"]
]);

export const getMovieType = async () => {
    return await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
};

export const fetchPopularMovie = async (page) => {
    return await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=EN&page=${page}`);
};

export const getMovies = async (listType, page) => {
    return await fetch(`https://api.themoviedb.org/3/movie/${listType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=EN&page=${page}`);
};

export const fetchSearchMovie = async (searchTerm) => {
    let respone;
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`)
        .then((response) => response.json())
        .then((res) => respone = res.results);
    return respone;
};

export const fetchMovieById = async (id) => {
    return await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=release_dates,credits,recommendations,similar,images&language=en-US`);
};

export const getMovieImg = (width, path) => {
    return `https://image.tmdb.org/t/p/w${width}/${path}`;
};