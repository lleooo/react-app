import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Tabs, Card} from "flowbite-react";
import {fetchMovieById, getMovieImg} from "../../utils/tmdb/tmdb.utils";


const Detail = () => {
    const [movieDetail, setMovieDetail] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetchMovieById(id);
            const movieData = await response.json();
            setMovieDetail({...movieData});
        };
        fetchDetail();
    }, [id]);

    const navigateToSimilarMovie = (id) => {
        navigate(`/movies/${id}`);
    };

    const goBack = () => {
        navigate(-1);
    };

    const renderActors = () => {
        if (movieDetail && movieDetail.credits) {
            return movieDetail.credits.cast.slice(0, 5).map((actor, idx) => (
                <Card key={idx} className="max-w-sm">
                    <div className="flex flex-col items-center pb-10 justify-between h-full">
                        <div className="rounded-full w-32 h-32 overflow-hidden relative">
                            <img alt="" src={`${getMovieImg('185', actor.profile_path)}`} className="relative bottom-5" />
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
                        <div className="">
                            <img alt="" src={`${getMovieImg('185', movie.poster_path)}`} className="w-full h-full" />
                            <h3 className=" text-sm font-medium text-white">{movie.title}</h3>
                        </div>
                        {/* <div>
                            {console.log(movie.title)}
                            <h5 className=" text-xl font-medium text-white">{movie.title}</h5>
                        </div> */}
                    </div>
                </Card>
            ));
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${getMovieImg('1280', movieDetail.backdrop_path)})`
            }}
            className="h-screen bg-cover bg-no-repeat flex justify-center items-center"
        >
            <div className="size-5/6 bg-black/30 backdrop-blur-sm">

                <div className="flex flex-row p-6 h-full relative">
                    <div className="absolute right-1 top-1 z-20">
                        <button type="button" onClick={() => goBack()} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className=" w-2/6 h-full">
                        <img src={`${getMovieImg('500', movieDetail.poster_path)}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className=" w-4/6 p-8 bg-white opacity-80">
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

                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Detail;


