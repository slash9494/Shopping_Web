import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import { LOG_IN_REQUEST } from "../modules/actions";

import { bindActionCreators } from "redux";
import { RootState } from "../modules/reducers";
// const mapDispatchToProps = dispatch => bindActionCreators({
//  fetchArticles,
//  fetchArticlesSuccess,
//  fetchArticlesFailure,
// }, dispatch)

const LoginBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
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

function LoginPage(props: any) {
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

  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state: RootState) => state.userReducer);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch<any>({
        type: LOG_IN_REQUEST,
        data: {
          email: email,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loginInfo?.loginSuccess === true) {
      props.history.push("/");
    }
    if (loginInfo?.loginSuccess === false) {
      const message = loginInfo.message;
      alert(message);
    }
  }, [loginInfo?.loginSuccess, loginInfo?.message, props.history]);
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

export default withRouter(LoginPage);
