import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Tabs, Card} from "flowbite-react";

// import {HiAdjustments, HiClipboardList, HiUserCircle} from "react-icons/hi";
// import {MdDashboard} from "react-icons/md";

const Detail = ({render}) => {
    console.log('render');
    const [name, setName] = useState('');
    const [movieDetail, setMovieDetail] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US&append_to_response=release_dates,credits,recommendations,similar,images&language=en-US`);
            const movieData = await response.json();
            console.log(movieData);
            setMovieDetail({...movieData});
        };
        fetchDetail();
    }, [navigate]);

    const navigateToSimilarMovie = (id) => {
        navigate(`/movies/${id}`);
    };

    const renderActors = () => {
        if (movieDetail && movieDetail.credits) {
            return movieDetail.credits.cast.slice(0, 5).map((actor, idx) => (
                <Card key={idx} className="max-w-sm">
                    <div className="flex flex-col items-center pb-10 justify-between h-full">
                        <div className="rounded-full w-32 h-32 overflow-hidden relative">
                            <img alt="" src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} className="relative bottom-5" />
                        </div>
                        <div>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{actor.name}</h5>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                    </div>
                </Card>
            ));
        }
    };

    const renderSimilarMovies = () => {
        if (movieDetail && movieDetail.similar) {
            return movieDetail.similar.results.slice(0, 5).map((movie, idx) => (
                <Card key={idx} className="max-w-sm" onClick={() => navigateToSimilarMovie(movie.id)}>
                    <div className="flex flex-col items-center pb-6 justify-between h-full">
                        <div className=" w-24 h-28 bg-fuchsia-600">
                            <img alt="" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} className="w-full h-full" />
                        </div>
                        <div>
                            <h5 className=" text-xl font-medium text-white">{movie.title}</h5>
                        </div>
                    </div>
                </Card>
            ));
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetail.backdrop_path})`
            }}
            className="h-screen bg-cover bg-no-repeat flex justify-center items-center"
        >
            <div className="size-5/6 bg-black/30 backdrop-blur-sm">
                <div className="flex flex-row p-6 h-full">
                    <div className=" w-2/6 h-full">
                        <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className=" w-4/6 p-8 bg-white opacity-80 w-full">
                        <section className="w-full">
                            <div>
                                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl">{movieDetail.title}</h1>
                                <p className="my-4 text-lg text-gray-500">{movieDetail.tagline}</p>
                            </div>
                            <div>
                                <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">{Math.floor(movieDetail.runtime / 60)}h{movieDetail.runtime % 60}m</kbd>
                                {movieDetail.genres && movieDetail.genres.map((gen, index) => <span className=" ml-5 mb-3  text-gray-500" key={index}>{gen.name}</span>)}
                            </div>
                            <div className="w-full">
                                <Tabs aria-label="Tabs with icons" style="underline" className=" mt-4"  >
                                    <Tabs.Item active title="Overview" >
                                        <p className="mb-3 text-gray-700 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:me-3 first-letter:float-start">{movieDetail.overview}</p>
                                    </Tabs.Item>
                                    <Tabs.Item title="Actor Details">
                                        <div className=" w-full flex justify-around overflow-scroll">{renderActors()}</div>
                                    </Tabs.Item>
                                    <Tabs.Item title="Similar">
                                        <div className=" w-full flex justify-around overflow-scroll">{renderSimilarMovies()}</div>
                                    </Tabs.Item>
                                </Tabs>
                            </div>

                            {/* <div>
                                <span>{movieDetail.overview}</span>
                            </div> */}

                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Detail;

//https://dribbble.com/shots/2845617-Re-design-Movie-Detail

