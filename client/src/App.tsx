import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  RouteComponentProps
} from 'react-router-dom';
import landingPage from './components/landingPage';
import loginPage from './components/loginPage';
import registerPage from './components/registerPage';

function App() {
  return (
   <Router>
     <Switch>
        <Route exact path="/" component={landingPage}/>
        <Route exact path="/login" component={loginPage}/>
        <Route exact path="/register" component={registerPage}/>
     </Switch>
   </Router>
  );
}

export default App;
