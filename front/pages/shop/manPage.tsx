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
import { loadManProductsActionAsync } from "../../modules";
import ItemFilter from "../../components/itemFilter/ItemFilter";

type Filters = {
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
  useEffect(() => {
    dispatch(loadManProductsActionAsync.request());
  }, []);
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
  const handleFilters = (propedFilters: number[], kind: string) => {
    const newFilters = { ...filters };
    newFilters[kind] = propedFilters;
    setFilters(newFilters);
    showFilteredResults(newFilters);
    console.log(newFilters);
  };
  const showFilteredResults = (filters: Filters) => {
    const variables = {
      filters: filters,
    };
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
      />
      <Grid container justify="center" spacing={3}>
        {loadProductsInfo?.data?.manProducts.map((item: any) => {
          return (
            <Grid item xs={6} sm={6} md={3} xl={3} className={classes.item}>
              <Link href="/shop/">
                <CardMedia className={classes.media} image={item.images[0]} />
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
    </AppContainer>
  );
}

export default manPage;
