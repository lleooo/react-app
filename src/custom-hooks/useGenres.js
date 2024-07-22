import {useEffect, useState} from 'react';
import {getMovieType} from '../utils/tmdb/tmdb.utils';

const useGenres = () => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        getMovieType().then(type => type.json()).then(type => setGenres([...type.genres]));
    }, []);

    return genres;
};

export default useGenres;
