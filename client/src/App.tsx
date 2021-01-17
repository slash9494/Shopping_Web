import React from 'react';
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

function App() {
  return (
   <Router>
     <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
     </Switch>
   </Router>
  );
}

export default App;
