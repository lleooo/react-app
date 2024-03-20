import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const Detail = ({render}) => {
    const [name, setName] = useState('');
    const [movieDetail, setMovieDetail] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetchDetail = async () => {
            console.log(id);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US&append_to_response=release_dates`);
            const movieData = await response.json();
            console.log(movieData);
            setMovieDetail({...movieData});
        };
        fetchDetail();
    }, []);

    return (

        <div className="w-full">
            <div className="relative">
                <div class="relative w-full h-[500px] overflow-hidden">
                    <img src={`https://image.tmdb.org/t/p/w1280/${movieDetail.backdrop_path}`} alt="" className=" scale-125 w-4/5 h-full absolute right-[-120px] top-[-20px] object-cover object-top" />
                    <div class="relative w-full h-full" style={{background: 'linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0.29175420168067223) 55%, rgba(0,0,0,0) 100%)'}}></div>
                </div>
                <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 h-5/6">
                    <div className=" h-full p-4" >
                        <img src={`https://image.tmdb.org/t/p/w342/${movieDetail.poster_path}`} alt="" className=" h-full" />
                    </div>
                    <section className=" pt-24">
                        <div>
                            {movieDetail.title}
                        </div>
                        <div>
                            <span>{movieDetail.release_date}</span>
                            {movieDetail.genres.map(gen => <span>{gen.name}</span>)}
                            <span>{Math.floor(movieDetail.runtime / 60)}h{movieDetail.runtime % 60}m</span>
                        </div>
                        <div>
                            213
                        </div>
                        <div>
                            {movieDetail.tagline}
                        </div>
                        <div>
                            overview
                        </div>
                        <div>
                            <span>{movieDetail.overview}</span>
                        </div>
                    </section>

                </div>
            </div>


            {/* <div >
                <div>圖片</div>
                <div className="flex">
                    <div>tile</div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div> */}
        </div>
    );
};

export default Detail;

//https://dribbble.com/shots/2845617-Re-design-Movie-Detail

