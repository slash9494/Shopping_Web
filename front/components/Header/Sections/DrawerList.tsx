import React from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import LoggedOutNavBar from "./LoggedOutNavBar";
import LoggedInNavBar, { Container } from "./LoggedInNavBar";
import { OptionLink } from "../HeaderContainer";

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
          <OptionLink href="/contact">CONTACT</OptionLink>
          <OptionLink href="/uploadProduct">VIDEO BOOK</OptionLink>
        </Container>
      </List>
    </div>
  );
}

export default DrawerList;
