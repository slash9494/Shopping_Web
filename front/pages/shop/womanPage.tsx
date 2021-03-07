import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductByIdActionAsync } from "../../modules";
import { createSelector } from "reselect";
import { RootState } from "../../modules/reducers";
import ImageGallery from "react-image-gallery";
import Description from "../../components/productDetail/Description";
function womanPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductByIdActionAsync.request("id"));
    // dispatch(authCheckDummyActionAsync.success(""));
  }, []);
  const checkLoadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.loadProductByIdInfo
  );
  const loadProductByIdInfo = useSelector(checkLoadProductInfo);
  console.log(loadProductByIdInfo?.data);

  return <div>{loadProductByIdInfo?.data?.description}</div>;
}

export default womanPage;
