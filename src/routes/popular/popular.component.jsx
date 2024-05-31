import MovieList from "../../components/movie-list/movie-list.component";
import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import BackgroundMovie from "../../components/background-movie/background-movie.component";

import {getMovieAsync} from "../../store/monster/monster.action";

const Popular = () => {
    const {index} = useSelector(state => state.background);
    const dispatch = useDispatch();
    const movies = useSelector(state => state.monster);
    useEffect(() => {
        dispatch(getMovieAsync());
    }, []);
    return (
        <>
            <BackgroundMovie cardIndex={index}></BackgroundMovie>
            <MovieList movies={movies} cardIndex={index} />
        </>
    );
};

export default Popular;