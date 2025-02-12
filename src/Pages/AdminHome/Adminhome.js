import React from 'react'
import martillo from '../../Images/martillo.png'
import pinzas from '../../Images/pinzas.png'
import candado from '../../Images/candado.png'
import carrito from '../../Images/compras.png'
import '../AdminHome/adminhome.css'
import { Link } from 'react-router-dom'

const Adminhome = () => {
  return (
    <div className='adminhome-container'>
        <div className='adminhome-content'>
            <Link to="/new-products" className='adminhome-box'>
                <img src={martillo} alt="martillo"/>
                <p>Crear Productos</p>
            </Link>
            <Link to="/my-products" className='adminhome-box'>
                <img src={pinzas} alt="pinzas"/>
                <p>Mis productos</p>
            </Link>
            <Link to="/categories" className='adminhome-box'>
                <img src={candado} alt="candado"/>
                <p>Crear Categorias</p>
            </Link>
            <Link to="/sales" className='adminhome-box'>
                <img src={carrito} alt="carrito"/>
                <p>Ventas</p>
            </Link>
        </div>
    </div>
  )
}

export default Adminhome