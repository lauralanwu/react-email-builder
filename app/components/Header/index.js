import React from 'react'

import A from './A'
import Img from './Img'
import Banner from './banner.jpg'

export function Header() {
  return (
    <header>
      <A href="https://ca.linkedin.com/in/lanlandewu">
        <Img src={Banner} alt="Email Template - logo" />
      </A>
    </header>
  )
}

export default Header
