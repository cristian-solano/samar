import React from 'react'
import menu from '../../Images/menu.png'
import samar from '../../Images/samarnoback.png'
import '../Navbar/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-content'>
            <label htmlFor='navbar-open' className='navbar-open'>
                <img src={menu} alt="menu"/>
           </label>
        </div>
        <input type="checkbox" id="navbar-open" style={{display: "none"}}/>
        <div className='navbar-dashboard'>
            <Link>Productos</Link>
        </div>
        <div className='navbar-links'>
            <Link to="">
                <p>Nosotros</p>
            </Link>
            <Link to="">
                <p>Contacto</p>
            </Link>
            <Link to="/admin/1032/login">
                <p>Log in</p>
            </Link>
            <div className='navbar-logo'>
                <img src={samar} alt="logo"/>
            </div>
        </div>
    </div>
  )
}

export default Navbar