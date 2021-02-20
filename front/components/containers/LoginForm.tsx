import React, { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST, loginActionAsync } from "../modules/actions";

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

function LoginForm() {
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
  return (
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
  );
}

export default LoginForm;
