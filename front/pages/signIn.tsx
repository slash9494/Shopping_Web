import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginActionAsync } from "../modules/actions";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

// import { withRouter } from "react-router-dom";

import { RootState } from "../modules/reducers";

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

const LoginBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 40vh;
`;

function LoginForm(props: any) {
  const { loginInfo } = useSelector((state: RootState) => state.userReducer);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(loginActionAsync.request(inputs));
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (loginInfo?.data?.loginSuccess === true) {
      router.push("/");
    }
    if (loginInfo?.data?.loginSuccess === false) {
      const message = loginInfo.data.message;
      alert(message);
    }
  }, [loginInfo?.data?.loginSuccess, loginInfo?.data?.message, props.history]);
  return (
    <LoginBlock>
      <Form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" name="email" onChange={onChange} value={email} />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={password}
        />
        <br />
        <Button type="submit">Login</Button>
      </Form>
    </LoginBlock>
  );
}

export default LoginForm;
