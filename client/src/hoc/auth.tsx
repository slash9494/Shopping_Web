import { Action } from "../modules/types";
import React, { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../modules/reducers";
import { AUTH_CHECK_REQUEST } from "../modules/actions";

function Auth(
  SpecificComponent: any,
  option: Boolean | null,
  adminRoute: null | Boolean
) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck(props: any) {
    const dispatch = useDispatch();
    let user = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
      dispatch<any>({ type: AUTH_CHECK_REQUEST });

      //로그인하지 않은 상태
      if (!user.authCheckInfo?.isAuth) {
        if (option) {
          props.history.push("/login");
        }
      } else {
        //로그인 한 상태
        if (adminRoute && !user.authCheckInfo.isAdmin) {
          props.history.push("/");
        } else {
          if (option === false) {
            props.history.push("/");
          }
        }
      }
    }, [
      dispatch,
      props.history,
      // user.authCheckInfo?.isAdmin,
      // user.authCheckInfo?.isAuth,
    ]);
    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}

export default Auth;
