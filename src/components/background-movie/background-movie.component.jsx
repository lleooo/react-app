import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {BsStar} from "react-icons/bs";
import {BsStarFill} from "react-icons/bs";
import {BsStarHalf} from "react-icons/bs";
import {HiCheck, HiX} from "react-icons/hi";
import {movieType} from "../../utils/tmdb/tmdb.utils";
import {loginSuccess, refreshTokenAsync} from "../../store/jwt-token/token.action";
import {Button, Toast} from "flowbite-react";
import {useNavigate} from "react-router-dom";

const MovieContainer = styled.div`
    position:relative;
    width:100%;
    height:100vh;
    overflow:hidden;
`;

const MovieImg = styled.img`
    position:absolute;
    top:0;
    left:5%;
    width:100%;
    /* height: 100%; */
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
    bottom:0%;
    /* bottom: 60%; */
    width:100%;
    height:20%;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 21%, rgba(0,0,0,0.6783963585434174) 54%, rgba(0,0,0,0) 100%);
`;


const BackgroundMovieContent = styled.div`
    width:35%;
    height:60%;

    position:absolute;
    top:15%;
    left:10%;
    color:white;
    z-index:1;

    display:flex;
    flex-direction:column;

    font-size:16px;
`;

const MovieTitle = styled.div`
    height:20%; 
    font-family:'MovieTitle';
    font-size:4vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;

    .apple {
        font-size:3vw;
    }
    .xsmall{
        font-size:2vw;
    }
`;
const MovieInfoWrapper = styled.div`
    height:10%; 
    display:flex;
    font-size: 1.5vw;
    color: gold;
`;
const MovieTypeWrapper = styled.div`
    height:5%; 
    display:flex;
`;
const MovieType = styled.div`
    margin-right: 15px;
    border-right: 1px solid;
    padding-right: 10px;
`;
const MovieOutLine = styled.div`
    height:50%; 
    font-family:'body';
    line-height: 1.5;
    font-size: 20px;
`;


const BackgroundMovie = ({cardIndex}) => {
    const movies = useSelector(state => state.monster);
    const toast = useSelector(state => state.toast);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stars = [];
    let backgroundTitleFontSize = "";

    if (movies[cardIndex]) {
        const point = movies[cardIndex].vote_average / 2;
        for (let i = 0; i < Math.floor(point); i++) {
            stars.push('full');
        }

        if (point % 1 > 0) stars.push('half');

        while (stars.length < 5) stars.push('empty');
    }

    if (movies[cardIndex]) {
        if (movies[cardIndex].title.length > 30) {
            backgroundTitleFontSize = "2vw";
        } else if (movies[cardIndex].title.length > 20) {
            backgroundTitleFontSize = "3vw";
        }
    }

    const addFavorite = async (movieID) => {
        dispatch({type: "ADD_FAVORITE_MOVIE", payload: movieID});
    };
    return (
        <>

            <MovieContainer>
                {toast.show && <Toast className="fixed top-20 right-5">
                    {toast.result === "success" ?
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div> :
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                    }
                    <div className="ml-3 text-sm font-normal">{toast.msg}</div>
                </Toast>}

                {movies[cardIndex] &&
                    <>
                        <div style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${movies[cardIndex].backdrop_path}')`
                        }}
                            className="w-screen h-screen bg-cover bg-inherit bg-no-repeat ml-40">
                        </div>
                        <BackgroundMovieContent>
                            <MovieTitle style={{fontSize: backgroundTitleFontSize}}>{movies[cardIndex].title}</MovieTitle>
                            <MovieInfoWrapper>
                                {stars.map((star, idx) => {
                                    switch (star) {
                                        case 'full':
                                            return <BsStarFill key={idx} />;
                                        case 'half':
                                            return <BsStarHalf key={idx} />;
                                        default:
                                            return <BsStar key={idx} />;
                                    }
                                })}
                            </MovieInfoWrapper>
                            <MovieTypeWrapper>
                                {movies[cardIndex].genre_ids.map((typeID, idx) => {
                                    return <MovieType key={idx}>{movieType.get(typeID)}</MovieType>;
                                })}
                            </MovieTypeWrapper>
                            <div className="flex py-4">
                                <Button outline gradientDuoTone="greenToBlue" size="xl" onClick={() => {navigate(`/movies/${movies[cardIndex].id}`);}}>Detail</Button>
                                <Button outline gradientDuoTone="pinkToOrange" size="xl" className=" ml-9" onClick={() => addFavorite(movies[cardIndex].id)}>+</Button>
                            </div>
                            <MovieOutLine>{movies[cardIndex].overview}</MovieOutLine>
                        </BackgroundMovieContent>
                    </>
                }

                <Mask></Mask>
                <BottomMask></BottomMask>
            </MovieContainer>
        </>

    );
};

export default BackgroundMovie;