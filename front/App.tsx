import React, { Suspense } from "react";

import LandingPage from "./components/HomeLayout";
import LoginPage from "./pages/signIn";
import Auth from "./hoc/Auth";
import Header from "./components/Header/Header";
import { GlobalStyle } from "./globalStyle";
import UploadPage from "./pages/upLoadProduct";
import SignUpPage from "./pages/signUp";
import Footer from "./components/Footer";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Router>
        <GlobalStyle />
        <Header />

        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null, false)} />
          <Route
            exact
            path="/login"
            component={Auth(LoginPage, false, false)}
          />
          <Route
            exact
            path="/signUp"
            component={Auth(SignUpPage, false, false)}
          />
          <Route
            exact
            path="/product/upload"
            component={Auth(UploadPage, true, false)}
          />
        </Switch>
        <Footer />
      </Router> */}
    </Suspense>
  );
}

export default App;
