import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { AuthProvider, useAuth } from './components/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import { Email } from './Email';
import { Security } from './Security';
import { TwoFactorOtp } from './TwoFactorOtp';
import { MfaAuthenticator } from './MfaAuthenticator';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }: any) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />

        <Switch>
          {/* Authenticated routes */}
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/emails">
            <Email />
          </PrivateRoute>
          <PrivateRoute exact path="/security">
            <Security />
          </PrivateRoute>
          <PrivateRoute exact path="/security/mfa/otp">
            <TwoFactorOtp />
          </PrivateRoute>
          <PrivateRoute path="/security/mfa/:authenticatorId">
            <MfaAuthenticator />
          </PrivateRoute>

          {/* Unauthenticated routes */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/verify-email/:token" component={VerifyEmail} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
