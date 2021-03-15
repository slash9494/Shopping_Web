import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography, List, Drawer } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules/reducers";
import { createSelector } from "reselect";
import {
  loadManProductsActionAsync,
  authCheckActionAsync,
} from "../../modules";
import ItemFilter from "../../components/itemFilter/ItemFilter";
import { price } from "../../components/itemFilter/priceData";
import wrapper, { IStore } from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

export type Filters = {
  size: number[];
  category: number[];
  price: number[];
  [prop: string]: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    item: {
      padding: theme.spacing(2),
      textAlign: "center",
      height: 600,
      maxWidth: "280px",
      border: "transparent",
      boxShadow: "none",
      paddingTop: "90px !important",
      [theme.breakpoints.down("xs")]: {
        height: 290,
        paddingTop: "30px !important",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "400px",
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: "600px",
        height: "1000px",
      },
    },
    media: {
      paddingTop: "130%",
      cursor: "pointer",
    },
    cardContent: {
      padding: 0,
      paddingTop: 6,
    },
    cartText: {
      fontSize: "1em",
      fontStyle: "black",
    },
    gridContainer: {
      [theme.breakpoints.down("xs")]: {
        padding: "10vh 0 0 0",
      },
    },
  })
);

const AppContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px 10px 60px;
  margin: 0;
`;

function manPage() {
  const dispatch = useDispatch();
  const loadMoreProducts = () => {
    let changeSkip = skip + limit;

    let body = {
      skip: changeSkip,
      bodu: limit,
      loadMore: true,
    };
    dispatch(loadManProductsActionAsync.request(body));
    setSkip(changeSkip);
  };

  const classes = useStyles();
  const checkUploadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.loadProductsInfo
  );
  const loadProductsInfo = useSelector(checkUploadProductInfo);
  const [filters, setFilters] = useState<Filters>({
    size: [],
    category: [],
    price: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(16);
  const handleFilters = (propedFilters: number[] | number, kind: string) => {
    const newFilters = { ...filters };
    newFilters[kind] = propedFilters;
    if (kind === "price") {
      let priceValues = handlePrice(propedFilters);
      newFilters[kind] = priceValues;
    }
    console.log(newFilters);
    setFilters(newFilters);
    showFilteredResults(newFilters);
  };
  const handlePrice = (value: any) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key].id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const showFilteredResults = (filters: Filters) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
    };
    setSkip(0);
    dispatch(loadManProductsActionAsync.request(variables));
    // getProduct(variables)
  };
  const upDateSearchTerm = (newValue: string) => {
    const variables = {
      skip: 0,
      limit: "",
      filters: filters,
      searchTerm: newValue,
    };
    setSearchTerm(newValue);
    dispatch(loadManProductsActionAsync.request(variables));
    setSkip(0);
  };

  return (
    <AppContainer className={classes.root}>
      <ItemFilter
        sizeFilters={(propedSizeFilters: number[]) =>
          handleFilters(propedSizeFilters, "size")
        }
        categoryFilters={(propedCategoryFilters: number[]) =>
          handleFilters(propedCategoryFilters, "category")
        }
        priceFilters={(propedPriceFilters: number) =>
          handleFilters(propedPriceFilters, "price")
        }
        searchValue={upDateSearchTerm}
      />
      <Grid
        container
        justify="center"
        spacing={3}
        className={classes.gridContainer}
      >
        {loadProductsInfo?.data?.productsInfo?.map((item: any) => {
          return (
            <Grid item xs={6} sm={6} md={3} xl={3} className={classes.item}>
              <Link href={`/shop/detailview/manProduct/${item._id}`}>
                <CardMedia
                  className={classes.media}
                  image={`http://localhost:5000/${item.images[0]}`}
                />
              </Link>
              <CardContent className={classes.cardContent}>
                <Typography align="left" className={classes.cartText}>
                  <div style={{ cursor: "hover" }}> {item.title} </div>
                  <div>{Math.floor(item.price)}원</div>
                </Typography>
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
      <Button onClick={loadMoreProducts}>더보기</Button>
    </AppContainer>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    let body = {
      skip: 0,
      limit: 16,
    };
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(loadManProductsActionAsync.request(body));
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);
export default manPage;
