/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { FormattedMessage } from 'react-intl'

import NavBar from './NavBar'
import NavLink from './NavLink'
import messages from './messages'

export function Nav() {
  return (
    <NavBar role="Main Navigation">
      <NavLink to="/">
        <FormattedMessage {...messages.home} />
      </NavLink>

      <NavLink to="/features">
        <FormattedMessage {...messages.features} />
      </NavLink>
    </NavBar>
  )
}

export default Nav
