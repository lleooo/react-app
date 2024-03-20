import MovieCardTwoComponent from "../movie-card2/movie-card-two.component";
import Skeleton from "../../components/skeleton/skeleton.component";

const MovieCardList = ({movies, showSkeleton = false, isLazyload = false}) => {
    const skeletonAmount = 16;

    const movieWithSkeleton = isLazyload ? movies.filter(movie => movie) : movies;

    //when meet null in arr , will show skeleton
    if (isLazyload) for (let i = 0; i < 4; i++)movieWithSkeleton.push(null);


    return (
        <div className="flex justify-center" >
            <div className="w-5/6 grid grid-cols-4 gap-4">
                {showSkeleton ? (
                    <>
                        {Array.from({length: skeletonAmount}).map((_, i) => (
                            <Skeleton key={i} />
                        ))}
                    </>
                ) : (
                    movieWithSkeleton.map((movie, idx) => {
                        return movie ? <MovieCardTwoComponent key={idx} movie={movie} /> : <Skeleton key={idx} />;
                    })
                )}
            </div>
        </div >
    );
};
export default MovieCardList;
