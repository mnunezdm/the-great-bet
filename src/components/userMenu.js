import React, { useEffect, useState } from 'react';
import { mdiAccountCowboyHat } from '@mdi/js';
import { Icon } from '@mdi/react';

import { useUser, useUserUpdate } from './userContext';

import './userMenu.css';
import {
  OverlayTrigger,
  Button,
  Popover,
  Form,
  Spinner,
} from 'react-bootstrap';

export function NavbarUser() {
  const user = useUser();
  const updateUser = useUserUpdate();

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(user.loggedIn);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    user.on('loginState', onUserLoginStateChange);

    return () => {
      user.removeListener('loginState', onUserLoginStateChange);
    };
  });

  function onUserLoginStateChange(state) {
    setLoggedIn(state);
  }

  /**
   *
   * @param {Event} event
   */
  async function loginUser(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await user.login();
      document.body.click();
    } catch (e) {
      setError({
        title: 'Could not login',
        detail: e.message,
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function requestLogout() {
    setLoading(true);
    setError(null);
    try {
      const newUser = await user.logout();
      updateUser(newUser);
      document.body.click();
    } catch (e) {
      setError({
        title: 'Could not logout',
        detail: e.message,
      });
      console.error('Could not logout', e);
    } finally {
      setLoading(false);
    }
  }

  function loadingLoginButton() {
    return (
      <>
        <Spinner
          animation="border"
          variant="light"
          size="sm"
          className="mr-2"
        />
        Login in...
      </>
    );
  }

  function onChange(event) {
    user[event.currentTarget.id] = event.currentTarget.value;
  }

  function loginForm() {
    return (
      <>
        <Form
          onSubmit={loginUser}
          className="tab-content user-panel_form"
          method="POST"
        >
          <Form.Group id="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              required={true}
              autoComplete="username"
              onChange={onChange}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              required={true}
              onChange={onChange}
              autoComplete="current-password"
              disabled={loading}
            />
          </Form.Group>

          {error ? <div className="text-danger">{error.title}</div> : ''}
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={loading}
          >
            {loading ? loadingLoginButton() : 'Login'}
          </Button>
        </Form>
      </>
    );
  }

  function userActions() {
    return (
      <>
        <h6 className="dropdown-header">Welcome back {user.name}</h6>
        <button
          className="dropdown-item"
          onClick={requestLogout}
          disabled={loading}
        >
          Sign out
        </button>
      </>
    );
  }

  function popover() {
    return (
      <Popover>
        <Popover.Content>
          {loggedIn ? userActions() : loginForm()}
        </Popover.Content>
      </Popover>
    );
  }

  return (
    <OverlayTrigger
      trigger="click"
      overlay={popover()}
      placement="auto"
      rootClose
      transition={false}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          {...triggerHandler}
          variant="link"
          ref={ref}
          className="d-flex p-0 pr-2 login-button"
        >
          <Icon size={1} aria-label="login" path={mdiAccountCowboyHat} />
          {!loggedIn && 'Sign In!'}
        </Button>
      )}
    </OverlayTrigger>
  );
}
