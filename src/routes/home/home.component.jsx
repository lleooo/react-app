import MovieList from "../../components/movie-list/movie-list.component";
import InputBox from "../../components/input-box/input-box.component";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {fetchSearchMovie} from "../../utils/tmdb/tmdb.utils";


const Home = ({movies}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const timer = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            let searchMovie = suggestion;

            if (timer.current !== null) {
                clearTimeout(timer.current);
                searchMovie = await fetchSearchMovie(searchTerm);
            }

            navigate('/search', {
                state: searchMovie
            });
        }
    };

    useEffect(() => {
        if (searchTerm !== '') {
            timer.current = setTimeout(async () => {
                const res = await fetchSearchMovie(searchTerm);
                setSuggestion(res);
                timer.current = null;
            }, 500);
        }

        return () => {
            clearTimeout(timer.current);
        };
    }, [searchTerm]);


    return (
        <>
            <InputBox
                onChange={e => handleChange(e)}
                onKeyDown={e => handleKeyDown(e)}
                suggestion={suggestion}
                searchTerm={searchTerm}
            ></InputBox >

            <MovieList movies={movies} />
        </>
    );
};

export default Home;