import styled from "styled-components";
import {SlArrowRightCircle} from "react-icons/sl";
import MovieList from "../../components/movie-list/movie-list.component";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {fetchSearchMovie} from "../../utils/tmdb/tmdb.utils";
import {useDispatch, useSelector} from "react-redux";
import {refreshTokenAsync} from "../../store/jwt-token/token.action";
import BackgroundMovie from "../../components/background-movie/background-movie.component";

import {getMonsterAsync} from "../../store/monster/monster.action";

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

const Home = () => {
    const {index} = useSelector(state => state.background);
    const dispatch = useDispatch();
    const movies = useSelector(state => state.monster);
    useEffect(() => {
        dispatch(getMonsterAsync());
    }, []);
    return (
        <>
            <BackgroundMovie cardIndex={index}></BackgroundMovie>
            <MovieList movies={movies} cardIndex={index} />
            {/* <Icon onClick={() => {
                if (cardIndex < movies.length - 1) setCardIndex(prevIndex => prevIndex + 1);
            }}></Icon> */}

            {/* <button onClick={() => {addLove(access_token);}}>假裝</button> */}
        </>
    );
};

export default Home;