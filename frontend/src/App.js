import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import ProtectedRoute from './auth/protected-route'
import NavBar from './Components/navBar/NavBar'
import VideosList from './views/videos/list/Videos'
import VideoUpload from './views/videos/upload/VideoUpload'

function App() {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <div className='App' >
        <NavBar/>
        <Switch>
          <Route path="/" exact ><VideosList/></Route>
          <ProtectedRoute path="/videos/upload" exact component={VideoUpload} />
        </Switch>
        </div>
      </Auth0ProviderWithHistory>
    </Router>
  )
}

export default App
