import React, { useEffect, useState } from 'react'
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import '../CreateProducts/createproducts.css'
import { NavLink } from 'react-router-dom';
import Links from '../../Components/Links/Links';


const CreateProducts = () => {

    const {register, handleSubmit,setValue, formState: {errors}} = useForm()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [imageProduct, setImageProduct] = useState(null)
    const [imageCode, setImageCode] = useState(null)

    const onSubmit = async (data, e) => {
        try {
            const selectedCategory = categories.find(cat => cat.id === data.category);
          await addDoc(collection(db, "Products"), {
            name_product: data.name_product,
            purchase_price: parseFloat(data.purchase_price),
            price_product: parseFloat(data.price_product),
            quantity: parseInt(data.quantity),
            category: {
                id: selectedCategory.id,
                name_category: selectedCategory.name_category
            },
            image_product: imageCode || "",
          });
      
          e.target.reset();
          setImageProduct(null);
          setImageCode(null)
          alert("Producto agregado con éxito");
      
        } catch (error) {
          console.error("🔥 Error al agregar producto:", error);
        }
      };

    const handlerOnImage = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImageProduct(imageUrl);
          setValue("imageFile", file); 
        }
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onloadend = () => {
              setImageCode(reader.result); 
            };
        }
    }



    const getProducts = async() => {
        await getDocs(collection(db, "Products"))
        .then((res) => {
            const productList = res.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            setProducts(productList)
        })
        
        .catch((err)=> {
            throw new Error(err)
        })
    }

    const getCategories = async() => {
        await getDocs(collection(db, "Categories"))
        .then((res)=> {
            const categoriesList = res.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            setCategories(categoriesList)
        }) 
        .catch((err) => {
            throw new Error('este es el error:', err)
        })
    }
 
    useEffect(() => {
        getProducts()
        getCategories()
    }, [])


    const mycategories = categories.length > 0 && categories.map(items => (
        <option key={items.id} value={items.id}>{items.name_category}</option>
    ))



  return (
    <div className='create-products-container'>
        <Links/>
        <div className='create-products-content-form'>
            <div className='create-products-circle be-one'></div>
            <div className='create-products-circle be-two'></div>
            <form className='create-product-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Agrega un producto</h1>
                <div className='create-product-item'>
                    <label htmlFor='name_product'>Nombre del producto</label>
                    <input type='text' placeholder='Nombre' {...register("name_product", {
                        required: true,
                        minLength: 4
                    })}/>
                    {errors?.name_product?.type === "required" && <p className='create-product-error'>Escribe un nombre</p>}
                    {errors?.name_product?.type === "minLength" && <p className='create-product-error'>Minimo 4 caracteres</p>}
                </div>
                <div className='create-product-item'>
                    <label htmlFor='purchase_price'>Precio de compra</label>
                    <input type='number' placeholder='Precio de compra' {...register("purchase_price", {
                        required: true
                    })}/>
                    {errors?.purchase_price?.type === "required" && <p className='create-product-error'>Escribe un precio</p>}
                </div>
                <div className='create-product-item'>
                    <label htmlFor='price_product'>Precio de venta</label>
                    <input type='number' placeholder='Precio de Venta' {...register("price_product", {
                        required: true
                    })}/>
                    {errors?.price_product?.type === "required" && <p className='create-product-error'>Escribe un precio</p>}
                </div>
                <div className='create-product-item'>
                    <label htmlFor='quantity'>Cantidad</label>
                    <input type='number' placeholder='Cantidad' {...register("quantity", {
                        required: true
                    })}/>
                    {errors?.quantity?.type === "required" && <p className='create-product-error'>Escribe una cantidad</p>}
                </div>
                <div className='create-product-item'>
                    <label>Categoría</label>
                    <select {...register("category", {
                        required: true
                    })}>
                        <option defaultValue="" disabled={true} selected={false}>Elige una opción</option>
                        {mycategories}
                    </select>
                </div>


                <div className='create-product-item'>
                    <label htmlFor='imageProduct'>Imagen</label>
                    <input type="file" accept='image/*' onChange={handlerOnImage}/>
                    {imageProduct && <img src={imageProduct} alt="product"/>}
                </div>
                
                <div className='create-product-button'>
                    <input type='submit' value="Subir"/>
                </div>
            </form>
        </div>
        <div className='create-products-content-my-products'>
            <h1>Productos Creados</h1>
            <div className='create-products-table'>
                <div className='create-products-table-item'>
                    <p>Cantidad</p>
                    <p>Nombre</p>
                    <p>Precio Compra</p>
                    <p>Precio Venta</p>
                    <p>Categoria</p>
                </div>
            {products.length > 0 ? (
                products.sort((a, b) => a.name_product.localeCompare(b.name_product)
            ).map(pro =>(
                    <div className='create-products-table-info' key={pro.id}>
                        <p>{pro.quantity}</p>
                        <p>{pro.name_product}</p>
                        <p>{pro.purchase_price}</p>
                        <p>{pro.price_product}</p>
                        <p>{pro.category?.name_category}</p>
                    </div>
                ))
            )
                 
            : (<div className='create-products-content-my-products-default'><p>No hay productos existentes</p></div>)}
            </div>
            <div className='create-products-link'>
                <NavLink to="/my-products">Ver lista de productos</NavLink>
            </div>
        </div>
    </div>
  )
}

export default CreateProducts