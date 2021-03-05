import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { signUpActionAsync } from "../modules";

import { useSelector } from "react-redux";
// import { withRouter } from "react-router-dom";

import { RootState } from "../modules/reducers/index";
import Swal from "sweetalert2";

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

function SignUpForm(props: any) {
  const { signUpInfo } = useSelector((state: RootState) => state.userReducer);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { email, password, name, confirmPassword } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire(
        "패스워드가 일치하지 않습니다.",
        "패스워드를 동일하게 입력하세요",
        "error"
      );
    }

    return dispatch(signUpActionAsync.request(inputs));
  };
  useEffect(() => {
    if (signUpInfo?.data?.signUpSuccess === true) {
      Swal.fire("회원가입을 완료했습니다.", "", "success");
      props.history.push("/");
    }
    if (signUpInfo?.data?.signUpSuccess === false) {
      Swal.fire("회원가입하는데 실패했습니다.", "", "error");
    }
  }, [props.history, signUpInfo?.data?.signUpSuccess]);
  return (
    <RegisterBlock>
      <Form onSubmit={onSubmit}>
        <label>Name</label>
        <input type="text" name="name" onChange={onChange} value={name} />
        <label>Email</label>
        <input type="email" name="email" onChange={onChange} value={email} />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={password}
        />
        <label>Comfirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={onChange}
          value={confirmPassword}
        />
        <br />
        <Button type="submit">회원가입</Button>
      </Form>
    </RegisterBlock>
  );
}

export default SignUpForm;
