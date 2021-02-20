import React from "react";
// import { withRouter } from "react-router-dom";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/LYH.svg";

import "./header.style.scss";

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

const useStyles = makeStyles({
  toolBarContainer: {
    height: "1rem",
  },
});

const HeaderContainer = styled.div`
  height: 70px;
  width: 93vw;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    padding-top: 20px;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;

  @media screen and (max-width: 800px) {
    height: 1em;
    margin: 0;
  }
`;

const ToolBarContainer = styled.div`
  height: 1em;
  margin: 0;
`;

const OptionsContainer = styled.div`
  width: 300px;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* @media screen and (max-width: 800px) {
    width: 50%;
  } */
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
`;

function Header() {
  const classes = useStyles();
  const { authCheckInfo } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo-container" />
      </LogoContainer>
      <ToolBarContainer>
        <Toolbar className={classes.toolBarContainer}>
          <Hidden smDown implementation="css">
            <OptionsContainer>
              <OptionLink to="/contact"> CONTACT </OptionLink>
              {!authCheckInfo?.data?.isAuth ? (
                <LoggedOutNavBar />
              ) : (
                  <LoggedInNavBar />
                )}
            </OptionsContainer>
          </Hidden>

          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </ToolBarContainer>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        ></Drawer>
      </Hidden>
    </HeaderContainer>
  );
}

export default withRouter(Header);
