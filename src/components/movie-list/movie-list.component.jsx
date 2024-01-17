import styled from "styled-components";
import MovieCard from "../movie-card/moive-card.component";

const ListContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center
`;

const List = styled.div`
    width:90%;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between
`;

const MovieList = ({movies}) => {
    return (
        <ListContainer>
            <List>
                {movies.map((movie) => {
                    return <MovieCard detail={movie}></MovieCard>;
                })}
            </List>
        </ListContainer>
    );
};

export default MovieList;