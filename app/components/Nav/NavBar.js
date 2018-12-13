import styled from 'styled-components'
import PropTypes from 'prop-types'

const NavBar = styled.nav`
  text-align: center;
  background-color: #1f2532;
  display: flex;
`

NavBar.propTypes = {
  role: PropTypes.string,
}

export default NavBar
