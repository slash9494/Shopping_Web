import React, { useState } from "react";
import { List, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: 16,
    height: 16,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    // "$root.Mui-focusVisible &": {
    //   outline: "2px auto rgba(19,124,189,.6)",
    //   outlineOffset: 2,
    // },
    // "input:hover ~ &": {
    //   backgroundColor: "#ebf1f5",
    // },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#000000",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#868e96",
    },
  },
  itemContainer: {
    width: "100%",
    justifyContent: "space-between",
    margin: 0,
    flexDirection: "row-reverse",
  },
  button: {
    color: "black",
  },
});
const Container = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListContainer = styled.div``;

const ListItemsContainer = styled.div`
  padding: 30px;
`;

function FilterList(props: any) {
  const classes = useStyles();

  function StyledCheckbox(props: CheckboxProps) {
    const classes = useStyles();

    return (
      <Checkbox
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        inputProps={{ "aria-label": "decorative checkbox" }}
        {...props}
      />
    );
  }
  return (
    <Container>
      <ButtonContainer>
        <IconButton onClick={props.onClose}>
          <CloseIcon className={classes.button} />
        </IconButton>
      </ButtonContainer>
      <ListContainer>
        <ListItemsContainer>
          <h2>사이즈</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="S"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="M"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="L"
          />
        </ListItemsContainer>
        <ListItemsContainer>
          <h2>아이템</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="Top"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="Bottom"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="Shoes"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="Acc"
          />
        </ListItemsContainer>
        <ListItemsContainer>
          <h2>가격</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="30,000"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="50,000"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="80,000"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckbox />}
            label="100,000"
          />
        </ListItemsContainer>
      </ListContainer>
    </Container>
  );
}

export default FilterList;
