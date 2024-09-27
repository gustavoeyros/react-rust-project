import styled from "styled-components";

export const SaleProductManagementComponent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  background-color: white;
  color: white;
  gap: 10px;
`;

export const SaleProductTitle = styled.h2`
  align-self: flex-start;
  margin: 0;
  padding: 10px 0;
  color: #604dee;
`;

export const SaleProductButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  border: none;
  background-color: #604dee;
  color: white;
  cursor: pointer;
`;

export const SaleProductInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #604dee;
  outline: none;
  box-sizing: border-box;
  padding-left: 10px;

  &::placeholder {
    padding-left: px;
  }
`;
