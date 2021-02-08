import { Action } from "../modules/types";
import React, { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../modules";
import { RootState } from "../modules/reducers";

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
      dispatch<any>(auth()).then((response: any) => {
        //로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}

export default Auth;
