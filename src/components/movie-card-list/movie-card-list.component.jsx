import MovieCardTwoComponent from "../movie-card2/movie-card-two.component";
import Skeleton from "../../components/skeleton/skeleton.component";
import {useDispatch} from "react-redux";

/**
 * 
 * @param {Object} props
 * @param {Array} props.movies - 電影資訊列表
 * @param {Boolean} props.showSkeleton - 使否顯示Skeleton
 * @param {Boolean} props.isLazyload - 此movieList是否需要lazyload功能
 * @param {String} props.buttonType - list裡顯示的不同button
 */
const MovieCardList = ({movies, showSkeleton = false, isLazyload = false, buttonType}) => {
    const dispatch = useDispatch();
    const skeletonAmount = 16;

    const moviesWithSkeleton = isLazyload ? movies.filter(movie => movie) : movies;

    if (isLazyload) for (let i = 0; i < 4; i++)moviesWithSkeleton.push(null);

    const addFavorite = async (movieID) => {
        dispatch({type: "ADD_FAVORITE_MOVIE", payload: movieID});
    };

    const rmFavorite = (movieID) => {
        dispatch({type: "REMOVE_FAVORITE_MOVIE", payload: movieID});
    };

    const renderButton = (movieID) => {
        switch (buttonType) {
            case 'home':
                return (
                    <div className="flex items-center justify-between">
                        <a href={`/movies/${movieID}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Detail</a>
                        <a onClick={() => {addFavorite(movieID);}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >add to favorites</a>
                    </div>
                );
            case 'love':
                return (
                    <div className="flex items-center justify-between">
                        <a onClick={() => {rmFavorite(movieID);}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Remove from favorites</a>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="flex justify-center bg-white dark:bg-gray-800" >
            <div className="w-5/6 grid grid-cols-4 gap-4 mt-20">
                {showSkeleton ? (
                    <>
                        {Array.from({length: skeletonAmount}).map((_, i) => (
                            <Skeleton key={i} />
                        ))}
                    </>
                ) : (
                    moviesWithSkeleton.map((movie, idx) => {
                        return movie ? <MovieCardTwoComponent key={idx} movie={movie} button={renderButton} /> : <Skeleton key={idx} />;
                    })
                )}
            </div>
        </div >
    );
};
export default MovieCardList;
