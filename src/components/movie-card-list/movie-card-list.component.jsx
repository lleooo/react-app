import MovieCard from "../movie-card/movie-card.component";
import Skeleton from "../../components/skeleton/skeleton.component";
import {useDispatch, useSelector} from "react-redux";
import Toast from "../toast/toast.component";
import useFavorites from "../../custom-hooks/useFavorites";

/**
 * 
 * @param {Object} props
 * @param {Array} props.movies - 電影資訊列表
 * @param {String} props.buttonType - list裡顯示的不同button
 */
const MovieCardList = ({movies = [], path}) => {
    const favorite = useSelector(state => state.user.favorite);
    const {addFavorite, rmFavorite} = useFavorites();


    const renderButton = (movieID) => {

        const addLoveBtn = <button onClick={() => {addFavorite(movieID);}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >add to favorites</button>;
        const removeLoveBtn = <button onClick={() => {rmFavorite(movieID);}} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800" >Remove from favorites</button>;

        switch (path) {
            case 'home':
                return (
                    <div className="flex items-center justify-between">
                        {favorite.includes(movieID) ? removeLoveBtn : addLoveBtn}
                    </div>
                );
            case 'love':
                return (
                    <div className="flex items-center justify-between">
                        {removeLoveBtn}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="flex justify-center bg-white dark:bg-gray-800" >
            <Toast topPos={'20'}></Toast>
            <div className="w-5/6 grid grid-cols-4 gap-4 mt-20">
                {
                    movies.map((movie, idx) => {
                        return movie ? <MovieCard key={idx} movie={movie} button={renderButton} showRating={path === "home"} /> : <Skeleton key={idx} />;
                    })
                }
            </div>
        </div >
    );
};
export default MovieCardList;
