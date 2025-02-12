import React from 'react'
import martillo from '../../Images/martillonegro.png'
import pinzas from '../../Images/pinzasnegro.png'
import candado from '../../Images/candadonegro.png'
import carrito from '../../Images/comprasnegro.png'
import { Link } from 'react-router-dom'
import '../Links/links.css'

const Links = () => {
  return (
    <div className='links-container'>
        <div className='links-content'>
            <Link to= "/new-products">
                <img src={martillo} alt="martillo"/>
                <p>Crear productos</p>
            </Link>
            <Link to= "/my-products">
                <img src={pinzas} alt="pinzas"/>
                <p>Mis productos</p>
            </Link>
            <Link to= "/categories">
                <img src={candado} alt="candado"/>
                <p>Crear categorias</p>
            </Link>
            <Link to= "/sales">
                <img src={carrito} alt="carrito"/>
                <p>Ventas</p>
            </Link>
        </div>
    </div>
  )
}

export default Links