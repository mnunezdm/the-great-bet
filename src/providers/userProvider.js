import { BaseProvider } from './base';

export class UserProvider extends BaseProvider {
  /**
   *
   */
  async login(userData) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    const body = await this.constructor.getBody(response);

    if (response.status !== 200) {
      throw new LoginError(this.constructor.getErrorMessage(body));
    }

    return body.data;
  }

  async logout() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    const body = await this.constructor.getBody(response);

    if (response.status !== 204) {
      throw new LogoutError(this.constructor.getErrorMessage(body));
    }
  }

  async fetch() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    const body = await this.constructor.getBody(response);

    if (response.status !== 200) {
      throw new FetchError(this.constructor.getErrorMessage(body));
    }

    return body.data;
  }
}

class LoginError extends Error {
  constructor(message = '', ...params) {
    super(...params);
    this.message = message;
    this.name = 'LoginError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoginError);
    }
  }
}

class RegisterError extends Error {
  constructor(message = '', ...params) {
    super(...params);
    this.message = message;
    this.name = 'RegisterError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegisterError);
    }
  }
}

class FetchError extends Error {
  constructor(message = '', ...params) {
    super(...params);
    this.message = message;
    this.name = 'MeError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegisterError);
    }
  }
}

class LogoutError extends Error {
  constructor(message = '', ...params) {
    super(...params);
    this.message = message;
    this.name = 'MeError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegisterError);
    }
  }
}
