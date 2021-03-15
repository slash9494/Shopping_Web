import React from "react";
import styled from "styled-components";

const OptionLink = styled.a`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 956px) {
    flex-direction: column;
  }
`;
function LoggedOutNavBar() {
  return (
    <Container>
      <OptionLink href="/signUp">SIGN UP</OptionLink>
      <OptionLink href="/signIn">SIGN IN</OptionLink>
    </Container>
  );
}

export default LoggedOutNavBar;
