import React, { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST, loginActionAsync } from "../../../modules/actions";
// import { withRouter } from "react-router-dom";

// import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { logOutActionAsync } from "../../../modules";
import { LOG_OUT_REQUEST } from "../../../modules";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
`;

const useStyles = makeStyles({
  button: {
    fontSize: "1rem",
  },
});



function LoggedInNavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logOutActionAsync.request());
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Button type="submit" className={classes.button}>
          SIGN OUT
      </Button>
      </form>
      <OptionLink to="/product/upload">UPLOAD</OptionLink>
    </Container>
  );
}

export default LoggedInNavBar;
