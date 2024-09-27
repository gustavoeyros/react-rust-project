import styled from "styled-components";

export const HeaderComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  background-color: #604dee;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #604dee;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: white;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  height: 30px;
  border: none;
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  &::placeholder {
    padding-left: 10px;
  }
`;
