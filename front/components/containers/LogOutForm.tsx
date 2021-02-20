import React, { FormEvent } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { logOutActionAsync } from "../modules";

const useStyles = makeStyles({
  button: {
    fontSize: "1rem",
  },
});

function LogOutForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logOutActionAsync.request());
  };

  return (
    <form onSubmit={onSubmit}>
      <Button type="submit" className={classes.button}>
        SIGN OUT
      </Button>
    </form>
  );
}

export default LogOutForm;
