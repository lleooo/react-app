import {useSelector} from "react-redux";
import styled from "styled-components";


const MovieContainer = styled.div`
    position:relative;
    width:100%;
    height:100vh;
    overflow:hidden;
`;

const MovieImg = styled.img`
    position:absolute;
    top:0;
    left:15%;
    width:90%
`;

const BackgroundMovieContent = styled.div`
    position:absolute;
    top:0;
    color:white;
    z-index:1
`;

const Mask = styled.div`
    position:absolute;
    top:0;
    width:100%;
    height:100vh;
    background: rgb(0,0,0);
    background: linear-gradient(75deg, rgba(0,0,0,1) 0%, rgba(9,9,9,1) 25%, rgba(11,11,11,0.8016456582633054) 33%, rgba(14,14,14,0.2666316526610645) 47%, rgba(0,0,0,0.39548319327731096) 100%);
`;

const BottomMask = styled.div`
    position:absolute;
    bottom:0;
    width:100%;
    height:20%;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 21%, rgba(0,0,0,0.6783963585434174) 54%, rgba(0,0,0,0) 100%);
`;

const BackgroundMovie = ({cardIndex}) => {
    const movies = useSelector(state => state.monster);
    return (
        <MovieContainer>
            {movies[cardIndex] &&
                <div>
                    <MovieImg
                        alt={`background`}
                        //w92、w154、w185、w342、w500、w780、w1280
                        src={`https://image.tmdb.org/t/p/w1280/${movies[cardIndex].backdrop_path}`}
                    />
                    <BackgroundMovieContent>
                        {movies[cardIndex].title}
                    </BackgroundMovieContent>
                </div>
            }

            <Mask></Mask>
            <BottomMask></BottomMask>
        </MovieContainer>
    );
};

export default BackgroundMovie;