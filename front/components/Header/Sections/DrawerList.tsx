import React from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";

function DrawerList() {
  return (
    <div>
      <Divider />
      <List>
        {["SIGN IN", "SIGN UP", "CONTACT", "VIDEOBOOK"].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DrawerList;
