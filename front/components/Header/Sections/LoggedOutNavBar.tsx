import React from "react";

import styled from "styled-components";

const OptionLink = styled.a`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;

function LoggedOutNavBar() {
  return (
    <div>
      <OptionLink href="/signUp">SIGN UP</OptionLink>

      <OptionLink href="/signIn">SIGN IN</OptionLink>
    </div>
  );
}

export default LoggedOutNavBar;
