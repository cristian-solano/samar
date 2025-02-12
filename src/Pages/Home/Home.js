import React from 'react'
import glass from '../../Images/lupa.png'
import '../Home/home.css'

const Home = () => {
  return (
    <div className='home-container'>
        <div className='home-search'>
            <input type='text' placeholder='Escribe el nombre de un producto'/>
            <div className='home-search-glass'>
                <img src={glass} alt="glass"/>
            </div>        
        </div>
        <div className='home-products'>
            <div className='home-categories'>
            </div>
            <div className='home-all-products'>

            </div>
        </div>
    </div>
  )
}

export default Home