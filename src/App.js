import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Navbar from './components/navbar';
import Landing from './views/Landing'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-gray-50 pb-32">
        &nbsp;
        <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
