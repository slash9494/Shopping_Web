import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { SIGN_UP_REQUEST, signUpActionAsync } from "../modules";

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

function SignUpForm() {
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
      return alert("패스워드가 일치하지 않습니다.");
    }

    return dispatch(signUpActionAsync.request(inputs));
  };
  return (
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
  );
}

export default SignUpForm;
