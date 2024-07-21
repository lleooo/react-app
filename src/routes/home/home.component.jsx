import {useCallback, useEffect, useRef, useState} from "react";
import MovieCardList from "../../components/movie-card-list/movie-card-list.component";
import {fetchPopularMovie} from "../../utils/tmdb/tmdb.utils";
import useGetPopularMovies from "../../custom-hooks/useGetPopularMovies";
import Skeleton from "../../components/skeleton/skeleton.component";

const Home = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const {data} = useGetPopularMovies(page);

    //add useCallback to prevent handleScroll re-create while Home re-render
    const handleScroll = useCallback(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        if (windowHeight + scrollY + 1 >= bodyHeight) {
            setPage((pre) => pre + 1);
        }
    }, []);

    useEffect(() => {
        if (data) setMovies((pre) => [...pre, ...data]);
    }, [page, data]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <MovieCardList movies={movies} path={'home'} />
        </>

    );
};

export default Home;
