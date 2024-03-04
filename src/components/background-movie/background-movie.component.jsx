import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {BsStar} from "react-icons/bs";
import {BsStarFill} from "react-icons/bs";
import {BsStarHalf} from "react-icons/bs";
import {movieType} from "../../utils/tmdb/tmdb.utils";
import {loginSuccess, refreshTokenAsync} from "../../store/jwt-token/token.action";


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

    font-size:16px
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
const MovieBtnWrapper = styled.div`
    height:15%;
    .btn {
        color: white;
        padding: .75rem 2.5rem;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 1rem;
    }
    .detailBtn{
        background-color: #4CAF50;
        margin-right:1.5rem;
        &:hover{
            background-color: #60c365;
        }
    }
    .loveBtn{
        background: linear-gradient(to right, #FF416C, #FF4B2B);
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 10px;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    }
`;
const MovieOutLine = styled.div`
    height:50%; 
    font-family:'body';
    line-height: 1.5;
    font-size: 20px;
`;


const BackgroundMovie = ({cardIndex}) => {
    const movies = useSelector(state => state.monster);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const stars = [];
    let backgroundTitleFontSize = "";

    if (movies[cardIndex]) {
        const point = movies[cardIndex].vote_average / 2;

        for (let i = 0; i < Math.floor(point); i++) {
            stars.push('full');
        }

        if (point % 1 > 0) stars.push('half');

        for (let j = 0; j <= Math.ceil(5 - stars.length); j++) {
            stars.push('empty');
        }
    }

    if (movies[cardIndex]) {
        if (movies[cardIndex].title.length > 30) {
            backgroundTitleFontSize = "2vw";
        } else if (movies[cardIndex].title.length > 20) {
            backgroundTitleFontSize = "3vw";
        }
    }

    const addFavorite = async (movieID) => {
        const res = await fetch('/api/addFavorite', {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': user.access_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': user.username,
                'movieID': movieID
            })
        });
        const addFavoriteRes = await res.json();

        switch (addFavoriteRes.msg) {
            case "successful":
                dispatch(loginSuccess(addFavoriteRes.data));
                break;
            case "access expired":
                dispatch(refreshTokenAsync(user));
                break;
            default:
                break;
        }

    };
    // addResp.then(async (res) => await res.json()).then(({msg}) => {
    //     if (msg === 'success') {
    //         console.log('新增成功');
    //     } else if (msg === 'access expired') {
    //         dispatch(refreshTokenAsync()).then((res) => {
    //         });
    //     } else {

    //     }
    // });

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
                        <MovieBtnWrapper>
                            <button className="btn detailBtn" >Detail</button>
                            <button className="btn loveBtn" onClick={() => addFavorite(movies[cardIndex].id)}>+</button>
                        </MovieBtnWrapper>
                        <MovieOutLine>{movies[cardIndex].overview}</MovieOutLine>
                    </BackgroundMovieContent>
                </div>
            }

            <Mask></Mask>
            <BottomMask></BottomMask>
        </MovieContainer>
    );
};

export default BackgroundMovie;