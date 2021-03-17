import React, { useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        width: "25ch",
        marginBottom: "15px",
      },
    },
  })
);
function SearchProduct(props: any) {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    props.searchValue(e.currentTarget.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="검색"
        onChange={onChange}
        value={input}
      />
    </form>
  );
}

export default SearchProduct;
