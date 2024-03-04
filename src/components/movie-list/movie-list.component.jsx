import styled from "styled-components";
import MovieCard from "../movie-card/moive-card.component";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const ListContainer = styled.div`
    position:absolute;
    bottom:.5rem;
    width:100%;
    // height:30%;
    overflow:hidden;
    transition: transform 0.5s ease;
`;

const List = styled.div`
    width:175%;
    position: relative;
    display: flex;
    transition: transform 0.5s ease;
`;

const MovieList = ({movies}) => {
    const {index} = useSelector(state => state.background);
    const dispatch = useDispatch();
    const translateVal = (index - 1) * -4;//todo:get card element width
    const style1 = {
        width: '4%'
    };

    const handleClick = (e) => {
        // console.log(e);
    };

    const movieClick = (index) => {
        dispatch({type: 'setIndex', payload: {index: index}});
    };

    return (
        <ListContainer>
            <List style={{transform: `translateX(${translateVal}%)`}} onClick={(w) => {handleClick(w);}}>
                {movies.map((movie, idx) => {
                    let activeCard = idx === index ? true : false;
                    return <MovieCard key={movie.id} detail={movie} activeCard={activeCard} clickEvent={() => {movieClick(idx);}} style={style1}></MovieCard>;
                })}
            </List>
        </ListContainer >
    );
};

export default MovieList;