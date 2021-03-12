import React from "react";

import styled from "styled-components";

import Logo from "../../images/LYH.svg";
import Link from "next/link";

import { useSelector } from "react-redux";

import { RootState } from "../../modules/reducers";

import LoggedOutNavBar from "./Sections/LoggedOutNavBar";
import LoggedInNavBar from "./Sections/LoggedInNavBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import DrawerList from "./Sections/DrawerList";
import { createSelector } from "reselect";

const useStyles = makeStyles({
  toolBarContainer: {
    height: "1rem",
    width: "20vw",
    justifyContent: "flex-start",
    padding: 0,
    paddingLeft: "3vw",
  },
});

const HeaderContainer = styled.div`
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

const LogoContainer = styled.div`
  width: 20vw;
  height: 90px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 80vw;
    margin: 0px;
    padding: 0;
    height: 90px;
    display: flex;
    padding-right: 20vw;
    padding-top: 20px;
  }
`;

const LogoLink = styled.a`
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

const LeftMenuContainer = styled.div`
  margin: 0;
  width: 40vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 6vw;
`;

const OptionsContainer = styled.div`
  width: 40vw;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding-right: 6vw;
  align-items: center;
`;

const OptionLink = styled.a`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;

function Header() {
  const classes = useStyles();
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserDataInfo);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <HeaderContainer>
      <Hidden mdUp>
        <Toolbar className={classes.toolBarContainer}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </Hidden>
      <Hidden smDown implementation="css">
        <LeftMenuContainer>
          <OptionLink href="/contact">CONTACT</OptionLink>

          <OptionLink href="/uploadProduct">VIDEO BOOK</OptionLink>
        </LeftMenuContainer>
      </Hidden>
      <LogoContainer>
        <LogoLink href="/">
          <Logo />
        </LogoLink>
      </LogoContainer>
      <Hidden smDown implementation="css">
        <OptionsContainer>
          {!userInfo?.data?.isAuth ? <LoggedOutNavBar /> : <LoggedInNavBar />}
        </OptionsContainer>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <DrawerList />
        </Drawer>
      </Hidden>
    </HeaderContainer>
  );
}

export default Header;
