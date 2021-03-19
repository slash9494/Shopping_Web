import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { logOutActionAsync } from "../../../modules";
import ShoppingBag from "../../../images/Shopping-bag.svg";
import { Badge, Drawer } from "@material-ui/core";
interface LogInNavBarProps {
  badgeCount: number;
  showCartDrawer: any;
}

export const Container = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 956px) {
    flex-direction: column;
  }
`;

const OptionLink = styled.a`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;
const BagOptionLink = styled.a`
  padding: 10px 15px;
  font-size: 1rem;
  text-decoration: none;
  color: black;
  @media screen and (max-width: 956px) {
    display: none;
  }
`;
const useStyles = makeStyles({
  button: {
    fontSize: "1rem",
  },
  drawer: {
    zIndex: 10,
    position: "fixed",
  },
});
export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 21,
      top: 25,
      fontSize: 15,
      [theme.breakpoints.down("sm")]: {
        top: 20,
        right: 16,
        fontSize: 14,
      },
    },
  })
)(Badge);
function LoggedInNavBar(props: LogInNavBarProps) {
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
      <BagOptionLink>
        <StyledBadge
          badgeContent={props.badgeCount}
          color="default"
          showZero={true}
          className="badge"
          onMouseEnter={props.showCartDrawer}
        >
          <ShoppingBag width={40} height={40} />
        </StyledBadge>
      </BagOptionLink>
    </Container>
  );
}

export default LoggedInNavBar;
