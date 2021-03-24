import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './components/navbar'
import Landing from './views/Landing'
import Profile from './views/Profile'
import ProfileForm from './views/ProfileForm'
import Signin from './views/Signin'
import Signup from './views/Signup'
import Band from './views/Band'
import Orderform from './views/Orderform'
import History from './views/History'
import Chat from './views/Chat'
import ChatList from './views/ChatList'
import { toast } from 'react-toastify'

import config from './config/toastify'

function App() {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
  const accountType = useSelector(state => state.userData.accountType)

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
            <Route
              exact
              path='/profile/'
              render={() =>
                loginStatus && accountType === 'band' ? (
                  <ProfileForm />
                ) : (
                  <Redirect
                    to='/'
                    render={toast(
                      'You need to have band account to enter',
                      config
                    )}
                  />
                )
              }
            />
            <Route
              path='/order/:id'
              render={() =>
                loginStatus ? <Orderform /> : <Redirect to='/login' />
              }
            />
            <Route path='/bands'>
              <Band />
            </Route>
            
            <Route path='/chatroom/:RoomId'>
              <Chat />
            </Route>
            <Route exact path='/chatroom'>
              <ChatList />
            </Route>
            <Route
              path='/login'
              render={() => (loginStatus ? <Redirect to='/' /> : <Signin />)}
            ></Route>
            <Route
              path='/register'
              render={() => (loginStatus ? <Redirect to='/' /> : <Signup />)}
            ></Route>
            <Route
              path='/history'
              render={() => (loginStatus ? <History /> : <Redirect to='/' />)}
            />
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
