import styled from "styled-components";


const Card = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    position:relative; 
    transition: 0.5s ease-out; 
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

const MovieCard = ({detail, activeCard, clickEvent, style}) => {
    const {title, poster_path} = detail;
    const className = activeCard ? 'card activeCard' : 'card';
    const cardSize = activeCard ? {} : style;

    return (
        <Card className={className} onClick={() => clickEvent()} style={cardSize}>
            <MovieImg
                alt={`movie ${title}`}
                //w92、w154、w185、w342、w500、w780、w1280
                src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
            />
            <MovieTitle>{title}</MovieTitle>
        </Card>
    );
};

export default MovieCard;