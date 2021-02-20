import { Action } from "../modules/types";
import React, { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
import { AUTH_CHECK_REQUEST, authCheckActionAsync } from "../modules/actions";
import userReducer from "../modules";

function Auth(
  SpecificComponent: any,
  option: Boolean | null,
  adminRoute: Boolean
) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck(props: any) {
    const dispatch = useDispatch();
    const userAuthInfo = createSelector(
      (state: RootState) => state.userReducer,
      (userReducer) => userReducer.authCheckInfo
    );
    const authCheckInfo = useSelector(userAuthInfo);

    useEffect(() => {
      dispatch(authCheckActionAsync.request());
      //로그인하지 않은 상태
      if (!authCheckInfo?.data?.isAuth) {
        if (option) {
          alert("로그인이 필요합니다.");
          props.history.push("/login");
        }
        return;
      }
      if (adminRoute && !authCheckInfo?.data?.isAdmin) {
        //로그인 한 상태

        alert("접근할 수 없는 페이지입니다.");
        props.history.goBack();
        return;
      }
      if (authCheckInfo?.data?.isAuth && option === false) {
        alert("이미 로그인이 되어있습니다.");
        props.history.push("/");
        return;
      } else {
        return;
      }
    }, [authCheckInfo?.data?.isAuth]);
    return <SpecificComponent {...props} authCheckInfo={authCheckInfo} />;
  }

  return AuthenticationCheck;
}

export default Auth;
