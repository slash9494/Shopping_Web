import React from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import LoggedOutNavBar from "./LoggedOutNavBar";
import LoggedInNavBar, { Container } from "./LoggedInNavBar";
import { LinkContainer } from "../HeaderContainer";
import Link from "next/link";

function DrawerList(props: any) {
  return (
    <div>
      <List>
        {!props.userInfo?.data?.isAuth ? (
          <LoggedOutNavBar />
        ) : (
          <LoggedInNavBar />
        )}
        <Divider />
        <Container>
          <Link href="/contact">
            <LinkContainer>CONTACT</LinkContainer>
          </Link>
          <Link href="/contact">
            <LinkContainer>VIDEO BOOK</LinkContainer>
          </Link>
        </Container>
      </List>
    </div>
  );
}

export default DrawerList;
