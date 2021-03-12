import { Action } from "../modules/types";
import React, { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
import { AUTH_CHECK_REQUEST, authCheckActionAsync } from "../modules/actions";
import userReducer from "../modules";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
function Auth(
  SpecificComponent: any,
  option: Boolean | null,
  adminRoute: Boolean
) {
  // option //
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지

  const userAuthInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userData
  );
  const userData = useSelector(userAuthInfo);
  const router = useRouter();
  useEffect(() => {
    //로그인하지 않은 상태
    if (!userData?.data?.isAuth) {
      if (option) {
        Swal.fire(
          "로그인이 필요합니다.",
          "로그인 또는 회원가입을 해주세요",
          "info"
        );
        router.replace("/signIn");
      }
      return;
    }
    if (adminRoute && !userData?.data?.isAdmin) {
      //로그인 한 상태

      Swal.fire(
        "접근할 수 없는 페이지입니다.",
        "관리자 계정으로 로그인 해주세요",
        "warning"
      );
      router.back();
      return;
    }
    if (userData?.data?.isAuth && option === false) {
      Swal.fire("이미 로그인이 되어있습니다.", "", "info");
      router.replace("/");
      return;
    }
  }, []);

  return <SpecificComponent />;
}

export default Auth;
