import styled from "styled-components";
import SearchSuggest from "../search-suggestion/search-suggestion.component";
import {IoSearch} from "react-icons/io5";
import {useState} from "react";

const InputContainer = styled.div`
  position:relative;
  width: 100%;
  max-width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 6px;
  transition: all 0.5s ease-in-out;
  &.open{
    max-width: 280px;
  }
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  padding: 0 15px;
  border: none;
  border-radius: 6px;
  outline: none;
  transition: all 0.5s ease-in-out;
  box-sizing:border-box;

  &.open{
    padding: 0 15px 0 45px;
  }
`;

const Search = styled.span`
  background:red;
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

const InputBox = ({onChange, onKeyDown, suggestion, searchTerm}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearchBox = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <InputContainer className={isExpanded ? "open" : "open"} >
        <Input className={isExpanded ? "open" : "open"} onChange={onChange} onKeyDown={onKeyDown} type="text" placeholder="Search..."></Input>
        <Search onClick={() => toggleSearchBox()}>
          <i style={{height: "20px"}}><IoSearch style={{fontSize: '20px'}} /></i>
        </Search>
        {suggestion.length !== 0 && <SearchSuggest suggestion={suggestion} searchTerm={searchTerm} />}
      </InputContainer>


    </>
  );
};

export default InputBox;