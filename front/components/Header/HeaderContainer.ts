import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 90px;
  width: 100vw;
  display: flex;
  /* flex-shrink: 0; */
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 5;
  background-color: transparent;
  @media screen and (max-width: 960px) {
    margin: 0px;
  }
`;

export const LogoContainer = styled.div`
  width: 20vw;
  height: 90px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 60vw;
    margin: 0px;
    padding: 0;
    height: 90px;
    display: flex;
    padding-top: 20px;
  }
`;

export const LogoLink = styled.a`
  width: 9vw;
  height: 70px;
  cursor: pointer;
  @media screen and (max-width: 960px) {
    width: 60vw;
    height: 50px;
    justify-content: center;
    display: flex;
  }
`;

export const LeftMenuContainer = styled.div`
  margin: 0;
  width: 40vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 6vw;
`;

export const OptionsContainer = styled.div`
  width: 40vw;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding-right: 6vw;
  align-items: center;
`;

export const OptionLink = styled.a`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;

export const BagContainer = styled.div`
  width: 20vw;
  padding: 0;
  padding-left: 10vw;
  padding-right: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
