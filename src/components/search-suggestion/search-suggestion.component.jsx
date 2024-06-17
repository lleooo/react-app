import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const SuggestContainer = styled.div`
  border:1px solid #ccc;
  background-color: #ccc;
  width:100%;
`;

const SuggestItem = styled.div`
    cursor: pointer;
    padding:10px;
    &:hover{
        background-color:  #e4e4e4;
    }
`;

const Hightlight = styled.span`
  color:red;
`;

const SearchSuggest = ({suggestion, searchTerm}) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <SuggestContainer>
            {suggestion.slice(0, 6).map((movie) => {
                let reStr = new RegExp(searchTerm, 'ig');
                let matches = movie.title.match(reStr);

                if (matches) {
                    let split = movie.title.split(reStr);
                    const movieNameEle = split.map((s, index) => (
                        <span key={index}>
                            {s}
                            {index < split.length - 1 && <Hightlight>{matches[index]}</Hightlight>}
                        </span>
                    ));
                    return <SuggestItem onClick={() => handleClick(movie.id)} key={movie.id} >{movieNameEle}</SuggestItem>;
                }
            })}
        </SuggestContainer>
    );
};

export default SearchSuggest;