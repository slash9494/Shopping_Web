import React, { FormEvent } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { logOutActionAsync } from "../../../modules";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const OptionLink = styled.a`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
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

      <OptionLink href="/upLoadProduct">UPLOAD</OptionLink>
    </Container>
  );
}

export default LoggedInNavBar;
