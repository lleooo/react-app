import MovieSlider from "../../components/movie-slider/movie-slider.component";
import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import BackgroundMovie from "../../components/background-movie/background-movie.component";

import {getMovieAsync} from "../../store/movies/movies.action";

const Popular = () => {
    const {index} = useSelector(state => state.background);
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
    useEffect(() => {
        dispatch(getMovieAsync());
    }, []);
    return (
        <>
            <BackgroundMovie cardIndex={index}></BackgroundMovie>
            <MovieSlider movies={movies} cardIndex={index} />
        </>
    );
};

export default Popular;