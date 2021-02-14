import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/LYH.svg";
import axios from "axios";
import "./header.style.scss";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../../modules";
import { RootState } from "../../modules/reducers";

const useStyles = makeStyles({
  button: {
    fontSize: "100%",
  },
});

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media screen and (max-width: 800px) {
    height: 10px;
    padding: 10px;
    padding-top: 30px;
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

const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    width: 50%;
  }
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

function Header(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { logOutInfo } = useSelector((state: RootState) => state.userReducer);
  // useEffect(() => {
  //   axios.get(`/api/users/logoutUpdate`).then((response) => {
  //     console.log(response.data);
  //     if (!response.data.login) {
  //       dispatch(loginUser(response.data));
  //     }
  //   });
  // }, [dispatch, props]);

  const onClick = () => {
    dispatch<any>({
      type: LOG_OUT_REQUEST,
    });

    if (logOutInfo && logOutInfo.logOutSuccess) {
      props.history.push("/login");
    } else {
      alert("로그아웃 하는데 실패했습니다.");
    }
  };

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo-container" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/contact"> CONTACT </OptionLink>
        {/* {
                 currentUser ?
                 <OptionLink onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                 : <OptionLink className='option' to='/signin'> SIGN IN</OptionLink>
             }  */}

        {/* {user.userData && user.userData.} */}
        {}

        <OptionLink className="option" to="/login">
          {" "}
          SIGN IN
        </OptionLink>
        <Button onClick={onClick} className={classes.button}>
          SIGN OUT
        </Button>
        {/* <CartIcon/> */}
      </OptionsContainer>
      {/*      
          {   hidden ? null :
              <CartDropDown/>
            } */}
    </HeaderContainer>
  );
}

export default withRouter(Header);
