import React, { useState, useEffect } from "react";
import {
  Drawer,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import styled from "styled-components";

interface CartDrawerProps {
  open: boolean;
  closeCartDrawer: any;
  userCartInfo: Array<any>;
}

const CartDrawerContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  width: 30%;
  height: 70px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: white;
  top: 90%;
`;

const Button = styled.a`
  background: black;
  color: white;
  cursor: pointer;
  font-size: 15px;
  height: 80%;
  width: 100%;
  &:hover {
    background: #495057;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 0% 10%;
  @media screen and (max-width: 1300px) {
    padding: 3% 5%;
  }
  @media screen and (min-width: 1900px) {
    padding: 0% 13%;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: theme.spacing(2),
      display: "flex",
      textAlign: "center",
      maxWidth: "100%",
      border: "transparent",
      boxShadow: "none",
      height: "300px",
      [theme.breakpoints.up("xl")]: {
        height: "30vh",
      },
    },
    media: {
      paddingTop: "150%",
      [theme.breakpoints.up("xl")]: {
        height: "22vh",
      },
    },
    cardContent: {
      width: "50%",
    },
    gridContainer: {
      height: "100%",
    },
  })
);

function CartDrawer(props: CartDrawerProps) {
  const classes = useStyles();
  return (
    <Drawer open={true} anchor="right" variant="persistent">
      <CartDrawerContainer onMouseLeave={props.closeCartDrawer}>
        <Grid container direction="column" className={classes.gridContainer}>
          {props.userCartInfo?.map((item: any) => {
            return (
              <>
                <Grid item className={classes.item}>
                  <ImageContainer>
                    <CardMedia
                      className={classes.media}
                      image={`http://localhost:5000/${item.productInfo.image}`}
                    />
                  </ImageContainer>
                  <CardContent className={classes.cardContent}>
                    <Typography align="left">
                      <h3> {item.productInfo.title} </h3>
                      <div>{item.productInfo.price}원</div>
                      <div></div>
                      <div>
                        {item.productInfo.size === 1
                          ? "S"
                          : item.productInfo.size === 2
                          ? "M"
                          : "L"}
                      </div>
                      <h3>{item.quantity}개</h3>
                    </Typography>
                  </CardContent>
                </Grid>
                <Divider variant="middle" />
              </>
            );
          })}
        </Grid>
      </CartDrawerContainer>
      <Footer>
        <Button href="/cart">장바구니로 가기</Button>
      </Footer>
    </Drawer>
  );
}

export default CartDrawer;
