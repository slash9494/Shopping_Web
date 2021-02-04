import React ,{Suspense}from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  RouteComponentProps
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Auth from './hoc/auth';
import Header from './components/Header/Header';
import { GlobalStyle } from './globalStyle';

function App() {
  return (
   <Suspense fallback={(<div>Loading...</div>)}>
     <Router>
     <GlobalStyle/>
     <Header/>
     
       <Switch>
          <Route exact path="/" component={Auth(LandingPage,null,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false,null)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false,null)}/>
       </Switch>
      </Router>
   </Suspense>
  );
}

export default App;
