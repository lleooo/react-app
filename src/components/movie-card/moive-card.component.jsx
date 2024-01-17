import styled from "styled-components";

const Card = styled.div`
    width:20%;
    padding:20px
`;

const MovieCard = ({detail}) => {
    const {title, poster_path, overview} = detail;
    return (
        <Card>
            {/* <img
                alt={`monster ${title}`}
                src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            /> */}
            <h2>{title}</h2>
            <p>{overview}</p>
        </Card>
    );
};

export default MovieCard;