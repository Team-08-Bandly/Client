import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'

import Navbar from './components/navbar'
import Landing from './views/Landing'
import Profile from './views/Profile'
import Signin from './views/Signin'
import Signup from './views/Signup'
import Band from './views/Band'
import Orderform from './views/Orderform'

function App () {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

  return (
    <div className='min-h-screen bg-gray-50'>
      <Router>
        <Navbar />
        <div className='bg-gray-50 pb-32'>
          &nbsp;
          <Switch>
            <Route path='/profile/:id'>
              <Profile />
            </Route>
            <Route path="/Order">
              <Orderform />
            </Route>
            <Route path="/bands">
              <Band />
            </Route>
            <Route
              path='/login'
              render={() => (loginStatus ? <Redirect to='/' /> : <Signin />)}
            ></Route>
            <Route
              path='/register'
              render={() => (loginStatus ? <Redirect to='/' /> : <Signup />)}
            ></Route>
            <Route exact path='/'>
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
