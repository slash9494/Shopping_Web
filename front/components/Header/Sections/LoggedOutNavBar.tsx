import React from "react";
import styled from "styled-components";
import Link from "next/link";

const LinkContainer = styled.div`
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
      <Link href="/signUp">
        <LinkContainer>SIGN UP</LinkContainer>
      </Link>
      <Link href="/signIn">
        <LinkContainer>SIGN IN</LinkContainer>
      </Link>
    </Container>
  );
}

export default LoggedOutNavBar;
