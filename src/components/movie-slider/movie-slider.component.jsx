import styled from "styled-components";
import MovieSliderCard from "../movie-slider-card/moive-slider-card.component";
import {useDispatch, useSelector} from "react-redux";

const SliderContainer = styled.div`
    position:absolute;
    bottom:.5rem;
    width:100%;
    overflow:hidden;
    transition: transform 0.5s ease;
`;

const Slider = styled.div`
    width:200%;
    position: relative;
    display: flex;
    transition: transform 0.5s ease;
`;

const MovieSlider = ({movies}) => {
    const {index} = useSelector(state => state.background);
    const dispatch = useDispatch();
    const translateVal = (index - 1) * -4;//todo:get card element width
    const style1 = {
        width: '4%'
    };
    const movieClick = (index) => {
        dispatch({type: 'setIndex', payload: {index: index}});
    };

    return (
        <SliderContainer>
            <Slider style={{transform: `translateX(${translateVal}%)`}}>
                {movies.map((movie, idx) => {
                    let activeCard = idx === index ? true : false;
                    return <MovieSliderCard key={movie.id} detail={movie} activeCard={activeCard} clickEvent={() => {movieClick(idx);}} style={style1}></MovieSliderCard>;
                })}
            </Slider>
        </SliderContainer >
    );
};

export default MovieSlider;