import {useCallback, useEffect, useRef, useState} from "react";
import MovieCardList from "../../components/movie-card-list/movie-card-list.component";
import {fetchPopularMovie} from "../../utils/tmdb/tmdb.utils";

const Home = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const isLoading = useRef(false);

    //add useCallback to prevent handleScroll re-create while Home re-render
    const handleScroll = useCallback(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        if (windowHeight + scrollY + 1 >= bodyHeight) {
            if (!isLoading.current) setPage((pre) => pre + 1);
        }
    }, []);

    const fetchMovies = async (page) => {
        isLoading.current = true;
        try {
            const res = await fetchPopularMovie(page);
            const movies = await res.json();

            setMovies((pre) => [...pre, ...movies.results]);
            isLoading.current = false;
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <MovieCardList movies={movies} isLazyload={true} path={'home'} />
    );
};

export default Home;
