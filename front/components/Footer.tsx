import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default Footer;
