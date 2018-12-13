import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em 1em;
  margin: 1em 0.5em;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: var(--font-family);
  font-weight: bold;
  color: #41addd;

  &:active {
    background: #41addd;
    color: #fff;
  }
`
