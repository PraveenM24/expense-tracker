import './App.css'
import Header from './components/Header'
import Balance from './components/Balance'
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter as Router, Switch, Route} from  "react-router-dom"


function App() {

  // const [{user}, dispatch] = useStateValue();
  const user = null;
  return (
    <div className="App">
      <Router>
        <Header/>
        {!user ? (
          <Switch>
            <Route path="/home">
              <Balance/>
            </Route>
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
