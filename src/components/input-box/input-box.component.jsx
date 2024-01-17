import styled from "styled-components";
import SearchSuggest from "../search-suggestion/search-suggestion.component";

const Input = styled.input`
  padding:10px;
  font-size:16px;
  border:1px solid #ccc;
  border-radius:35px;
  width:15%;
  box-sizing:border-box;
`;

const InputBox = ({onChange, onKeyDown, suggestion, searchTerm}) => {
  return (
    <>
      <Input onChange={onChange} onKeyDown={onKeyDown}></Input>
      {suggestion.length !== 0 && <SearchSuggest suggestion={suggestion} searchTerm={searchTerm} />}
    </>
  );
};

export default InputBox;