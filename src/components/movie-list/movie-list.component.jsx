import styled from "styled-components";
import MovieCard from "../movie-card/moive-card.component";
import {useState} from "react";

const ListContainer = styled.div`
    position:absolute;
    bottom:.5rem;
    width:100%;
    overflow:hidden;
    transition: transform 0.5s ease;
`;

const List = styled.div`
    width:5000px;
    position: relative;
    display: flex;
    transition: transform 0.5s ease;
`;

const MovieList = ({movies, cardIndex}) => {
    const initPos = 130, gap = cardIndex * 130;
    return (
        <ListContainer>
            <List style={{transform: `translateX(${initPos - gap}px)`}}>
                {movies.map((movie, index) => {
                    let activeCard = index === cardIndex ? true : false;
                    return <MovieCard key={movie.id} detail={movie} activeCard={activeCard}></MovieCard>;
                })}
            </List>
        </ListContainer>
    );
};

export default MovieList;