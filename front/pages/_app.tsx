import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import wrapper from "../store/configureStore";
import type { AppProps /*, AppContext */ } from "next/app";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../index.scss";
import styled from "styled-components";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans Condensed",sans-serif',
  },
  palette: {
    primary: { main: "#000000" },
  },
});

const HeaderFixedContainer = styled.div`
  padding-top: 90px;
  width: 100%;
`;

const LYH = ({ Component, pageProps }: AppProps) => (
  // React.useEffect(() => {
  //   const jssStyles:any = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []),
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>LYH</title>
    </Head>

    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/* <HeaderFixedContainer> */}

      <Header />
      <Component {...pageProps} />

      <Footer />
    </MuiThemeProvider>
  </>
);

LYH.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

//   export function reportWebVitals(metric: any) {
//     console.log(metric);
//   }

export default wrapper.withRedux(LYH);
