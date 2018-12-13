import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #2c2c2c;
    --text-color-dark-bg: #FFFFFF;
    --font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    color: var(--primary-color);
    overflow-x: hidden;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p,
  label {
    line-height: 1.5em;
  }
`

export default GlobalStyle
