import {useLocation} from "react-router-dom";
import MovieList from "../../components/movie-list/movie-list.component";

const Search = () => {
    const {state} = useLocation();
    return (
        <MovieList movies={state} />
    );
};

export default Search;