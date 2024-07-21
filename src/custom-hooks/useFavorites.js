import {useDispatch} from "react-redux";

const useFavorites = () => {
    const dispatch = useDispatch();

    const addFavorite = (movieID) => {
        console.log('add');
        dispatch({type: "ADD_FAVORITE_MOVIE", payload: movieID});
    };

    const rmFavorite = (movieID) => {
        console.log('rm');
        dispatch({type: "REMOVE_FAVORITE_MOVIE", payload: movieID});
    };

    return {addFavorite, rmFavorite};
};

export default useFavorites;
