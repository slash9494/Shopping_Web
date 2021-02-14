import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import rootReducer from "./modules/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./modules/sagas";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans Condensed",sans-serif',
  },
  palette: {
    primary: { main: "#000000" },
  },
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
