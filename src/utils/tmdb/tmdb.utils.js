const key = 'e147528034b3b1192f389af6460b3ad9';

// get type api : https://api.themoviedb.org/3/genre/movie/list?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US
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


const fetchMovie = () => {

};

export const fetchSearchMovie = async (searchTerm) => {
    let respone;
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}`)
        .then((response) => response.json())
        .then((res) => respone = res.results);
    return respone;
};