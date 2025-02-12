import React, { useEffect, useState } from 'react'
import '../MyProducts/myproducts.css'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import Links from '../../Components/Links/Links'

const MyProducts = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const getMyProducts = async() => {
        await getDocs(collection(db, "Products"))
        .then((res) => {
            const productList = res.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            setProducts(productList)
            setFilteredProducts(productList); 
        })
        .catch((err) => {
            throw new Error("Este es el error:", err)
        })
    }

    const getCategories = async () => {
        const res = await getDocs(collection(db, "Categories"));
        const categoryList = res.docs.map((doc) => doc.data().name_category);
        setCategories(["Todos", ...categoryList]); 
    }

    useEffect(()=> {
        getMyProducts()
        getCategories();
    }, [])


    const handleFilter = (category) => {
        if (category === "Todos") {
          setFilteredProducts(products);
        } else {
          setFilteredProducts(products.filter((product) => product.category?.name_category === category));
        }
      };




  return (
    <div className='products-container'>
        <Links/>
        <div className='products-circle circle-one'></div>
        <div className='products-circle circle-two'></div>
        <div className='products-circle-small circle-three'></div>
        <div className='products-circle-small circle-four'></div>
        <div className='products-circle circle-five'></div>
        <div className='products-search'>
            {categories.map((category, index) => (
            <button key={index} onClick={() => handleFilter(category)}>
                {category}
            </button>
            ))}
        </div>
        <h1>Mis produtos</h1>
        <div className='products-content'>
            {filteredProducts.length > 0 ? 
                filteredProducts.sort((a, b) => a.name_product.localeCompare(b.name_product)).map(items => (
                    <div className='products-items' key={items.id}>
                        <h4>{items.category?.name_category}</h4>
                        <img src={items.image_product} alt={`${items.id}-${items.name_product}`}/>
                        <h5>{items.name_product}</h5>
                        <div className='products-price-table'>
                            <div className='products-price-table-item'>
                                <p>Compra $</p>
                                <p>Venta $</p>
                            </div>
                            <div className='products-price-table-info'>
                                <p>{items.purchase_price}</p>
                                <p>{items.price_product}</p>
                            </div>
                        </div>
                        <div className='products-price-table-quantity'>
                            <p>{items.quantity}</p>
                        </div>
                    </div>
                ))
            : <div><p>No hay productos existente</p></div>}
        </div>
    </div>
  )
}

export default MyProducts