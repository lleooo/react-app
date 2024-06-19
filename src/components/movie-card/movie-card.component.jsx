
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const MovieCard = ({movie, button, showRating}) => {
    const votePercent = (movie.vote_average) / 10 * 100;
    return (
        <div className=" relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href={`/movies/${movie.id}`}>
                <img className="p-4 rounded-t-lg" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
            </a>

            {showRating && <div className=' w-1/4 absolute top-0 left-0'>
                <CircularProgressbar value={votePercent.toFixed(1)} text={`${votePercent.toFixed(1)}%`} background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#081c22",
                        textColor: "#fff",
                        pathColor: "#00f66b",
                        trailColor: "transparent"
                    })} />
            </div>}


            <div className="px-5 pb-5">
                <div className=' h-20'>
                    <a href={`/movies/${movie.id}`}>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>

                    </a>
                </div>
                {button(movie.id)}

            </div>
        </div>

    );
};

export default MovieCard;
