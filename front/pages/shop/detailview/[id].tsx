import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Description from "../../../components/productDetail/Description";
import ProductDetail from "../../../components/productDetail/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  authCheckDummyActionAsync,
  loadProductByIdActionAsync,
} from "../../../modules";
import { createSelector } from "reselect";
import { stat } from "fs";
import { RootState } from "../../../modules/reducers";
import productReducer from "../../../modules/reducers/ProductReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageViewContainer: {
      width: "100%",
      border: "transparent",
      boxShadow: "none",
      backgroundColor: "#f8f9fa",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      height: "100%",
    },
  })
);

const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  align-items: center;
  padding: 0 5vw;
  position: "absolute";
  @media screen and (max-width: 1280px) {
    padding: 0 2vw;
  }
  @media screen and (max-width: 1025px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 40vw;
  padding: 20px 40px 40px 40px;
  height: 86vh;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  @media screen and (max-width: 769px) {
    width: 96vw;
  }
  @media screen and (max-width: 600px) {
    height: 50vh;
    padding: 20px;
  }
`;

const DescriptionContainer = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const images = [
  {
    original:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    original:
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    thumbnail:
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

function DetailProduct() {
  const router = useRouter();
  const { id } = router.query;
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [showThumbNail, setShowThumbNail] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      return setShowThumbNail(false);
    }
    dispatch(loadProductByIdActionAsync.request("id"));
    dispatch(authCheckDummyActionAsync.success(""));
  }, []);
  const checkLoadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.loadProductByIdInfo
  );
  const loadProductByIdInfo = useSelector(checkLoadProductInfo);
  return (
    <AppContainer>
      <DescriptionContainer>
        <Description
          description={loadProductByIdInfo?.data?.productInfo.description}
          descriptionTitle={
            loadProductByIdInfo?.data?.productInfo.descriptionTitle
          }
        />
      </DescriptionContainer>
      <ImageContainer>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={showThumbNail}
          thumbnailPosition="right"
        />
      </ImageContainer>
      <ProductDetail />
    </AppContainer>
  );
}

export default DetailProduct;
