import React from 'react';
import AuthButton from '../authButton';
import { useAuth0 } from '@auth0/auth0-react';
import {useHistory} from 'react-router-dom'
import './nav.css'

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();

  const handleUploadRedirect = () => {
    history.push('/videos/upload')
  }

  return (
    <div className="nav">
      <div className="nav-header">
        <h1 onClick={()=> history.push('/')}>VideoTube</h1>
      </div>
      <div className="nav-buttons">
        {isAuthenticated && (
          <div className="profile-info" >
        <i onClick={handleUploadRedirect} className="fas fa-arrow-up"></i>
          <div className="profile-div">
            <img src={user.picture} />
          </div>
          <div>
            <p>{user.email}</p>
          </div>
        </div>
      )}
        <AuthButton />
      </div>
    </div>
  );
};


export default NavBar;
