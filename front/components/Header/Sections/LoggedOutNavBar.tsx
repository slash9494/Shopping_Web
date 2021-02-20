import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
`;

function LoggedOutNavBar() {
  return (
    <div>
      <OptionLink to="/signUp">SIGN UP</OptionLink>
      <OptionLink to="/login">SIGN IN</OptionLink>
    </div>
  );
}

export default withRouter(LoggedOutNavBar);
