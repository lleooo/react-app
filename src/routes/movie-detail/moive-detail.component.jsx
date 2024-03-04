import {useEffect, useRef} from "react";
import {useParams} from "react-router-dom";

const Detail = () => {
    const {id} = useParams();
    const countRef = useRef();
    console.log('render');
    useEffect(() => {
        //     const fetchDetail = async () => {
        //         const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US`);
        //         const movieDetail = await response.json();
        //         console.log(movieDetail);
        //     };
        //     console.log(ref);
        //     fetchDetail();
        console.log(countRef);
    }, []);



    return (
        <div>
            <button ref={countRef} style={{marginTop: '15rem'}}>hi</button>
        </div>
    );
};

export default Detail;

//https://dribbble.com/shots/2845617-Re-design-Movie-Detail