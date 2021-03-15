import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { signUpActionAsync, authCheckActionAsync } from "../modules";

import { useSelector } from "react-redux";

import { RootState } from "../modules/reducers/index";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { createSelector } from "reselect";
import SignUpForm from "../components/SignUpForm";
const RegisterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 35vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
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

function SignUp() {
  const { signUpInfo } = useSelector((state: RootState) => state.userReducer);
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserDataInfo);
  const router = useRouter();
  useEffect(() => {
    if (signUpInfo?.data?.signUpSuccess === true) {
      Swal.fire("회원가입을 완료했습니다.", "", "success");
      router.replace("/");
    }
    if (signUpInfo?.data?.signUpSuccess === false) {
      Swal.fire(
        "회원가입하는데 실패했습니다.",
        signUpInfo?.data?.message,
        "error"
      );
    }
  }, [signUpInfo?.data?.signUpSuccess]);
  useEffect(() => {
    if (userInfo?.data?.isAuth) {
      Swal.fire("이미 로그인이 되어있습니다.", "", "info");
      router.replace("/");
    }
  }, []);
  return <SignUpForm />;
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

export default SignUp;
