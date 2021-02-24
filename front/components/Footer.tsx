import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";

const useStyles = makeStyles({
  root: {
    margin: 0,
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      LEEYH&nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box className={classes.root}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default Footer;
