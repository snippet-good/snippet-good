import React from 'react'
import { Link } from 'react-router-dom'
import links from './nav-links'

const Nav = () => {
  return (
    <div>
      {links.map(link => (
        <Link to={link.path} key={link.type}>
          {link.type}
        </Link>
      ))}
    </div>
  )
}

export default Nav
