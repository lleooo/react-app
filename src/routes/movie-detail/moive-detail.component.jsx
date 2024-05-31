import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {Tabs, Card} from "flowbite-react";

// import {HiAdjustments, HiClipboardList, HiUserCircle} from "react-icons/hi";
// import {MdDashboard} from "react-icons/md";

const Detail = ({render}) => {
    const [name, setName] = useState('');
    const [movieDetail, setMovieDetail] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US&append_to_response=release_dates,credits,recommendations,similar`);
            const movieData = await response.json();
            console.log(movieData);
            setMovieDetail({...movieData});
        };
        fetchDetail();
    }, []);

    const renderActors = () => {
        if (movieDetail && movieDetail.credits) {
            return movieDetail.credits.cast.slice(0, 5).map((actor, idx) => (
                <Card className="max-w-sm">
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
                <Card className="max-w-sm">
                    <div className="flex flex-col items-center pb-10 justify-between h-full">
                        <div className="w-32 h-60">
                            <img alt="" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} className="w-32 h-50" />
                        </div>
                        <div>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{movie.title}</h5>
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
                    <div className="basis-1/3 h-full bg-no-repeat" style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetail.poster_path})`
                    }}></div>
                    <div className="basis-2/3 p-8">
                        <section className="">
                            <div>
                                <p className="uppercase text-2xl font-bold tracking-wide">{movieDetail.title}</p>
                                <p className="">{movieDetail.tagline}</p>

                            </div>
                            <div>
                                <span>{movieDetail.release_date ? movieDetail.release_date.split("-")[0] : ""}</span>
                                <span>{Math.floor(movieDetail.runtime / 60)}h{movieDetail.runtime % 60}m</span>
                                {movieDetail.genres ? movieDetail.genres.map((gen, index) => <span key={index}>{gen.name}</span>) : ""}
                            </div>
                            <Tabs aria-label="Tabs with icons" style="underline" className=" mt-4"  >
                                <Tabs.Item active title="Overview" >
                                    {movieDetail.overview}
                                    <div>production_companies : <span>{movieDetail.production_companies ? movieDetail.production_companies.map((com, index) => <span key={index}>{com.name}</span>) : ""}</span></div>
                                    <div>runtime : <span>{Math.floor(movieDetail.runtime / 60)}h{movieDetail.runtime % 60}m</span></div>
                                    <div>Genres : {movieDetail.genres ? movieDetail.genres.map((gen, index) => <span key={index}>{gen.name}</span>) : ""}</div>
                                </Tabs.Item>
                                <Tabs.Item title="Actor Details">
                                    <div className=" w-full flex justify-around">{renderActors()}</div>
                                </Tabs.Item>
                                <Tabs.Item title="Similar">
                                    <div className=" w-full flex justify-around">{renderSimilarMovies()}</div>
                                </Tabs.Item>
                            </Tabs>
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

