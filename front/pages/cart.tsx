import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Divider, IconButton, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductByIdInfo,
  authCheckActionAsync,
  removeCartActionAsync,
  REMOVE_CART_ITEM_REQUEST,
} from "../modules";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      display: "flex",
      height: "55vw",
      [theme.breakpoints.up("sm")]: {
        height: "33vw",
      },
      [theme.breakpoints.up("md")]: {
        height: "18vw",
      },
    },
    divider: {
      marginTop: "3vw",
    },
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "4vw",
      },
      [(theme.breakpoints.down("md"), theme.breakpoints.up("sm"))]: {
        fontSize: "2vw",
      },
      [(theme.breakpoints.down("xl"), theme.breakpoints.up("md"))]: {
        fontSize: "1.1vw",
      },
    },
    deleteIcon: {
      fontSize: "1.25vw",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4vw",
      },
      [(theme.breakpoints.down("md"), theme.breakpoints.up("sm"))]: {
        fontSize: "2vw",
      },
      [(theme.breakpoints.down("xl"), theme.breakpoints.up("md"))]: {
        fontSize: "1.2vw",
      },
    },
  })
);

const Img = styled.img`
  width: 50%;
  height: 100%;
`;

const AppContainer = styled.div`
  width: 100vw;
  padding: 5vw 10vw;
  padding-top: 5vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;
const PayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const PayButton = styled.button`
  background: black;
  color: white;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;
  font-weight: bold;
  &:hover {
    background: #495057;
  }
`;

export interface UserCartInfo {
  id: string;
  quantity: number;
  date: number;
}

function cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState();
  const checkUserInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserInfo);
  const calculateTotal = () => {
    let priceArray: number[] = [];
    userInfo.data?.cart.map((items: any) => {
      return priceArray.push(items.productInfo.price);
    });
    const reducer = (accumulator: any, currentValue: any) =>
      accumulator + currentValue;
    const priceTotal = priceArray.reduce(reducer, 0);
    setTotal(priceTotal);
  };

  const handleRemoveItem = (id: string, size: number) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST, id: id, size: size });
  };
  useEffect(() => {
    calculateTotal();
  }, [userInfo.data?.cart]);
  return (
    <AppContainer>
      <h2>장바구니</h2>
      <Grid container spacing={2}>
        {userInfo.data?.cart?.map((items: any) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              xl={3}
              lg={3}
              className={classes.itemContainer}
            >
              <Img src={`http://localhost:5000/${items.productInfo.image}`} />
              <ItemDetailContainer>
                <Typography variant="h6" className={classes.text}>
                  {items.productInfo.title}
                </Typography>
                <Typography className={classes.text}>
                  {items.productInfo.color}
                </Typography>
                <Divider className={classes.divider} />
                <Typography className={classes.text}>
                  {items.productInfo.price}원
                </Typography>
                <Typography className={classes.text}>
                  {items.productInfo.size === 1
                    ? "S"
                    : items.productInfo.size === 2
                    ? "M"
                    : "L"}
                </Typography>
                <Divider className={classes.divider} />
                <Typography className={classes.text}>
                  {items.quantity}개
                </Typography>
                <div>
                  <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={() =>
                      handleRemoveItem(
                        items.productInfo._id,
                        items.productInfo.size
                      )
                    }
                  />
                </div>
              </ItemDetailContainer>
            </Grid>
          );
        })}
      </Grid>
      <PayContainer>
        <h2>총 {total}원</h2>
        <PayButton>결제하기</PayButton>
      </PayContainer>
    </AppContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);

export default cart;
