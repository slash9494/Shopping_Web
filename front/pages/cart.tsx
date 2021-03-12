import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, CardMedia, Divider, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { authCheckDummyActionAsync, ProductByIdInfo } from "../modules";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
const useStyles = makeStyles({
  media: { paddingTop: "100%", width: "50%" },
  itemContainer: {
    display: "flex",
  },
  button: {
    padding: 0,
    width: "100%",
  },
});

const AppContainer = styled.div`
  width: 100vw;
  padding: 20vw;
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
  id: number;
  quantity: number;
  date: number;
}

function cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState();
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userData = useSelector(checkUserDataInfo);
  useEffect(() => {
    let cartItemsId = [];
    if (userData?.data?.cart) {
      if (userData.data.cart.length > 0) {
        userData.data.cart.forEach((item: UserCartInfo) => {
          cartItemsId.push(item.id);
        });
      }
    }
    dispatch(authCheckDummyActionAsync.success(""));
  }, []);

  const calculateTotal = (productInfo: ProductByIdInfo) => {
    let total = 0;
  };

  const handleRemoveItem = () => {
    // dispatch()
  };

  return (
    <AppContainer>
      <h2>장바구니</h2>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          xl={3}
          lg={3}
          className={classes.itemContainer}
        >
          <CardMedia
            className={classes.media}
            image="https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          />
          <ItemDetailContainer>
            <h3>자켓</h3>
            <p>그린</p>
            <Divider />
            <p>30,000</p>
            <p>L</p>
            <Divider />
            <p>2개</p>
            <IconButton edge="start" className={classes.button}>
              <DeleteIcon fontSize="small" onClick={handleRemoveItem} />
            </IconButton>
          </ItemDetailContainer>
        </Grid>
      </Grid>
      <PayContainer>
        <h2>총 {total}원</h2>
        <PayButton>결제하기</PayButton>
      </PayContainer>
    </AppContainer>
  );
}

export default cart;
