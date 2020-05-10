
import React, {useState} from 'react';
import './App.css';
import Header from './componenets/Header/Headers.js';
import Home from './componenets/Home/Home.js';
import LoginForm from './componenets/LoginForm/LoginForm.js';
import RegistrationForm from './componenets/RegisterForm/RegisterForm.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header/>
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/home">
                <Home/>
              </Route>
            </Switch>
        </div>
    </div>
    </Router>
  )
}

export default App;
