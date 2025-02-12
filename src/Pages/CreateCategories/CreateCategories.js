import React from 'react'
import '../CreateCategories/createcategories.css'
import { db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useForm } from 'react-hook-form'
import Links from '../../Components/Links/Links';

const CreateCategories = () => {

    const {register,handleSubmit, formState: {errors}} = useForm() 

    const onSubmit = async(res,e) => {
        try {
            await addDoc(collection(db, "Categories"), {
              name_category: res.name_category, 
              createdAt: new Date(), 
            });
      
            alert("✅ Categoría creada con éxito");
            e.target.reset(); 
          } catch (error) {
            console.error("❌ Error al crear categoría:", error);
        }
    }

  return (
    <div className='categories-container'>
        <Links/>
        <div className='categories-circle b-one'></div>
        <div className='categories-circle b-two'></div>
        <div className='categories-circle-small b-three'></div>
        <div className='categories-circle b-four'></div>
        <div className='categories-circle-small b-five'></div>
        <div className='categories-content'>
            <h2>Crear categorias</h2>
            <span>Esto servira para categorizar los productos</span>
            <form onSubmit={handleSubmit(onSubmit)} className='categories-form'>
                <div className='categories-form-items'>
                    <label htmlFor='name'>Nombre categoría</label>
                    <input type='text' placeholder='categoria' {...register("name_category", {
                        required: true
                    })}/>
                    {errors?.name_category?.type === "required" && <p className='categories-error'>Escribe algo</p>}
                </div>
                <div className='categories-form-button'>
                    <input type='submit' value="Guardar" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateCategories