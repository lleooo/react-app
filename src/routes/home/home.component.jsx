import styled from "styled-components";
import {SlArrowRightCircle} from "react-icons/sl";
import MovieList from "../../components/movie-list/movie-list.component";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {fetchSearchMovie} from "../../utils/tmdb/tmdb.utils";
import {useDispatch, useSelector} from "react-redux";
import {refreshTokenAsync} from "../../store/jwt-token/token.action";
import BackgroundMovie from "../../components/background-movie/background-movie.component";

const Icon = styled(SlArrowRightCircle)`
    position:absolute;
    top:50%;
    transform:translate(0%,-50%);
    right:0;
    font-size:40px;
    
    &:hover{
        color:red;
    }
`;

const Home = ({movies}) => {
    const {login, access_token} = useSelector(state => state.user);
    const [cardIndex, setCardIndex] = useState(0);
    const dispatch = useDispatch();


    const addLove = (token) => {
        if (login) {
            const addResp = fetch('api/addFavorite', {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token
                }
            });

            addResp.then(async (res) => await res.json()).then(({msg}) => {
                if (msg === 'success') {
                    console.log('新增成功');
                } else if (msg === 'access expired') {
                    dispatch(refreshTokenAsync()).then((res) => {
                        addLove(res.token);
                    });
                } else {

                }
            });
        };
    };

    return (
        <>
            <BackgroundMovie cardIndex={cardIndex}></BackgroundMovie>
            <MovieList movies={movies} cardIndex={cardIndex} />
            <Icon onClick={() => {
                if (cardIndex < movies.length - 1) setCardIndex(prevIndex => prevIndex + 1);
            }}></Icon>

            {/* <button onClick={() => {addLove(access_token);}}>假裝</button> */}
        </>
    );
};

export default Home;