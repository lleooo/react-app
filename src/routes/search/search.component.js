import {useLocation} from "react-router-dom";
import MovieList from "../../components/movie-slider/movie-slider.component";

const Search = () => {
    const {state} = useLocation();
    return (
        <MovieList movies={state} />
    );
};

export default Search;