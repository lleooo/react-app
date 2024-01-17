const key = 'e147528034b3b1192f389af6460b3ad9';

const fetchMovie = () => {

};

export const fetchSearchMovie = async (searchTerm) => {
    let respone;
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}`)
        .then((response) => response.json())
        .then((res) => respone = res.results);
    return respone;
};