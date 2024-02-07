import styled from "styled-components";


const Card = styled.div`
    width:125px;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    position:relative;
    transition: 0.5s ease-out;
    margin-right:.8rem;

    &.activeCard {
        width:180px
    }
`;

const MovieImg = styled.img`
`;

const MovieTitle = styled.div`
    color:white;
    font-size:16px
`;

const MovieCard = ({detail, activeCard}) => {
    const {title, poster_path} = detail;
    const className = activeCard ? 'activeCard' : '';
    return (
        <Card className={className}>
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