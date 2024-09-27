import styled from "styled-components";

export const SaleCardComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 99%;
  height: 120px;
  background-color: #604dee;
  color: white;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;

  &:hover {
    background-color: #796af1;
    transition: 1s;
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin-left: auto;
  button {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const SaleInformations = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 3rem;
  position: absolute;
`;

export const SaleInformationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SaleCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
