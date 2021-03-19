import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Navbar from './components/navbar';
import Landing from './views/Landing'
import Profile from './views/Profile'
import Signin from './views/Signin'
import Signup from './views/Signup'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Router>
      <Navbar />
      <div className="bg-gray-50 pb-32">
        &nbsp;
        <Switch>
            <Route path="/profile/:id">
              <Profile />
            </Route>
            <Route path="/login">
              <Signin />
            </Route>
            <Route path="/register">
              <Signup />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
        </Switch>
      </div>

    </Router>
    </div>
  );
}

export default App;
