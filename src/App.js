import React, { useEffect } from 'react';
import './App.css'
import Header from './components/Header'
import Balance from './components/Balance'
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter as Router, Switch, Route} from  "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './Firebase';


function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            id: authUser.uid,
            email: authUser.email
          })
        );
      } else { 
        dispatch(logout())
       }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Header/>
        {!user ? (
          <Switch>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
          </Switch>
        ): (
          <>
            <Balance/>
          </>        
        ) } 
      </Router>
    </div>
  );
}

export default App
