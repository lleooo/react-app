import styled from "styled-components";


const Card = styled.div`
    width:4%;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    position:relative; 
    transition: 0.5s ease-out;
    // border:1px solid red;
    padding-right:.8rem;
    box-sizing:border-box;

    &.activeCard {
        width:5%
    }
`;

const MovieImg = styled.img`
    max-width: 100%; 
    max-height: 100%;
`;

const MovieTitle = styled.div`
    color:white;
    font-size:16px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const MovieCard = ({detail, activeCard, clickEvent}) => {
    const {title, poster_path} = detail;
    const className = activeCard ? 'card activeCard' : 'card';

    return (
        <Card className={className} onClick={() => clickEvent()}>
            <MovieImg
                alt={`monster ${title}`}
                //w92、w154、w185、w342、w500、w780、w1280
                src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
            />
            <MovieTitle>{title}</MovieTitle>
        </Card>

    );
};

export default MovieCard;