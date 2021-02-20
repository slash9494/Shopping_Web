import React, { useEffect } from "react";
// import { withRouter } from "react-router-dom";

import styled from "styled-components";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import CardMedia from "@material-ui/core/CardMedia";
import ManImage from "../images/ManCategory.jpg";
import WomanImage from "../images/WomanCategory.jpg";
import KidImage from "./images/KidCategory.jpg";

const useStyles = makeStyles({
  container: {
    height: 50,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    paddingTop: "100%",
    boxSizing: "border-box",
  },
  imageHover: {
    cursor: "pointer",
    transform: "scale(1.1)",
    transition: "transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
  },
});

const styles = {
  imageStyle: {
    height: "100%",
    width: "100%",
    paddingTop: "100%",
    boxSizing: "border-box",
  },
} as const;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
`;

const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    align-items: center;
    display: grid;
    margin-right: 85px;
    grid-template-columns: 1.5fr;
    grid-gap: 15px;
  }
`;

const MenuItemContainer = styled.div`
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
  @media screen and (max-width: 800px) {
    width: 70vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    cursor: pointer;
    & .image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    & .content {
      opacity: 0.9;
    }
  }
  &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }
  @media screen and (max-width: 800px) {
    height: 300px;
  }
`;

const ContentContainer = styled.div`
  height: 90px;
  width: 6vw;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
`;

function HomeLayout(props: any) {
  const classes = useStyles();

  return (
    <LandingPageContainer>
      <DirectoryContainer>
        <MenuItemContainer>
          <CardMedia
            className="image"
            style={styles.imageStyle}
            image={ManImage}
            title="Man"
          />
          <ContentContainer>MAN</ContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <CardMedia
            className="image"
            style={styles.imageStyle}
            image={WomanImage}
            title="Man"
          />
          <ContentContainer>WOMAN</ContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <CardMedia
            className="image"
            style={styles.imageStyle}
            image={KidImage}
            title="Man"
          />
          <ContentContainer>KID</ContentContainer>
        </MenuItemContainer>
      </DirectoryContainer>
    </LandingPageContainer>
  );
}

export default HomeLayout;
