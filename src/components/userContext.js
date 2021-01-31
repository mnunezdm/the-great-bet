import React, { useContext, useState } from 'react';

import PropTypes from 'prop-types';

import { User } from '../models/userModel';

const _UserContext = React.createContext();
const _UserUpdateContext = React.createContext();

/**
 * @returns {User}
 */
export function useUser() {
  return useContext(_UserContext);
}

export function useUserUpdate() {
  return useContext(_UserUpdateContext);
}

export function UserContext({ children }) {
  const [user, setUser] = useState(User.runningUser);

  return (
    <_UserContext.Provider value={user}>
      <_UserUpdateContext.Provider value={setUser}>
        {children}
      </_UserUpdateContext.Provider>
    </_UserContext.Provider>
  );
}

UserContext.propTypes = {
  children: PropTypes.array,
};
