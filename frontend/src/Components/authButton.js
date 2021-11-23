import React from 'react';
import LoginButton from './loginButton/LoginButton'
import LogoutButton from './logoutButton/Logout';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  // const { isLoading } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
