import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import '../Admin/admin.css'
import eyes from '../../Images/vis.png'
import noeyes from '../../Images/novis.png'
import logoblanco from '../../Images/samarblanco.png'
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const [errMessage, setErrMessage] = useState("")
    const [eye, setEye] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async(res) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, res.email, res.password);
            const user = userCredential.user;
            console.log("Credentials:", user);
            navigate("/admin-home");
          } catch (error) {
            setErrMessage("Correo o contraseña incorrectos.");
          }
    } 


    const handlerOnEye = () => {
        if(eye === false){
            setEye(true)
        } else {
            setEye(false)
        }
    }

  return (
    <div className='admin-container'>
        <div className='admin-form-content'>
            <div className='admin-circle one'></div>
            <div className='admin-circle two'></div>
            <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
                <h1>Ingresa tu usuario de acceso</h1>
                <div className='admin-user'>
                    <label>Usuario</label>
                    <input type='email' placeholder='Correo electronico' {...register("email", {
                        required: true
                    })}/>
                    {errors?.email?.type === "required" && <p className='admin-error'>*Ingrese un correo*</p>}
                </div>
                <div className='admin-password'>
                    <label>Contraseña</label>
                    <div className='admin-password-eye'>
                        <input type={eye === true ? "text" : "password"} placeholder='Contraseña' {...register("password", {
                            required: true
                        })}/>
                        <p onClick={handlerOnEye}><img src={eye === true ? eyes : noeyes} alt="visible"/></p>
                    </div>
                    {errors?.password?.type === "required" && <p className='admin-error'>*Ingrese la contraseña*</p>}
                </div>
                <div className='admin-button'>
                    <input type='submit' value="Ingresar"/>
                </div>
                
                {errMessage && <div className='admin-err-gnl'><p className='admin-error'>{errMessage}</p></div>}
            </form>
        </div>
        
        <div className='admin-access'>
            <div className='admin-access-logo'>
                <img src={logoblanco} alt="logo"/>
            </div>
        </div>
    </div>
  )
}

export default Admin