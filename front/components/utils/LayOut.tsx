import React, { ReactElement } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

interface Props {
  children: ReactElement[];
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5vw;
`;

const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    align-items: center;
    display: flex;
    justify-content: center;
    grid-template-columns: 1.5fr;
    grid-gap: 15px;
  }
`;

export const MenuItemContainer = styled.a`
  height: 80vh;
  min-width: 30%;
  width: 22vw;
  overflow: hidden;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  text-decoration: none;
  color: #212529;
  font-size: 1.2em;
  @media screen and (max-width: 800px) {
    width: 70vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }
  &:hover {
    cursor: pointer;
  }
`;

function LayOut({ children }: Props) {
  return (
    <AppContainer>
      <DirectoryContainer>{children}</DirectoryContainer>
    </AppContainer>
  );
}

LayOut.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayOut;
