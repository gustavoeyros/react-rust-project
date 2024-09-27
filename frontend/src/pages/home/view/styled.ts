import styled from "styled-components";

export const Wrappper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #adbdff;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 70%;
  height: 100%;
  gap: 25px;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: #eff9f0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #604dee;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SalesWrappers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow-y: auto;
`;

export const ButtonHome = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  border: none;
  background-color: #604dee;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #796af1;
    transition: 1s;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
