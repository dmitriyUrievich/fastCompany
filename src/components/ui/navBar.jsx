import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  const navBar = [
    { key: 1, title: 'Main', ref: '/' },
    { key: 2, title: 'Login', ref: '/login' },
    { key: 3, title: 'Users', ref: '/users' }
  ]
  return (
    <ul className="nav justify-content-end">
      {navBar.map((item) => (
        <li
          className={'nav-item'}
          key={item.key}
        >
          <Link to={item.ref}
            className="nav-link"
          >
            {item.title}</Link>
        </li>
      ))}
    </ul>
  )
}
export default NavBar
