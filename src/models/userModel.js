import EventEmitter from 'events';

import { UserProvider } from '../providers/userProvider';

export class User extends EventEmitter {
  /**
   * @type {Number}
   */
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  /**
   * @type {Boolean}
   */
  get isLogged() {
    return Boolean(this.id);
  }

  /**
   * @type {String}
   */
  get username() {
    return this._username;
  }
  set username(username) {
    this._username = username;
  }

  /**
   * @type {String}
   */
  get password() {
    return this._password;
  }
  set password(password) {
    this._password = password;
  }

  /**
   * @type {String}
   */
  get name() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * @type {String}
   */
  get firstName() {
    return this._firstName;
  }
  set firstName(firstName) {
    this._firstName = firstName;
  }

  /**
   * @type {String}
   */
  get lastName() {
    return this._lastName;
  }
  set lastName(lastName) {
    this._lastName = lastName;
  }

  /**
   * @type {Boolean}
   */
  get loggedIn() {
    return Boolean(this.id);
  }

  constructor() {
    super();
    console.log('Initialized user');
  }

  async fetch() {
    const provider = new UserProvider();
    const response = await provider.fetch();

    Object.assign(this, response);

    this.emit('loginState', true);
    return response;
  }

  async login() {
    const provider = new UserProvider();
    const response = await provider.login({
      username: this.username,
      password: this.password,
    });

    Object.assign(this, response);

    this.emit('loginState', true);
    return response;
  }

  async logout() {
    const provider = new UserProvider();
    await provider.logout();
    this.emit('loginState', false);

    return this.constructor.resetRunningUser();
  }

  static get runningUser() {
    if (!User._runningUser) {
      User._runningUser = new User();
      User._runningUser.fetch();
    }
    return User._runningUser;
  }

  static resetRunningUser() {
    User._runningUser = new User();
    return User._runningUser;
  }
}
