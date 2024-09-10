'use client'

import Link from "next/link"
import { useState } from "react"

const page = () => {

    //////////////////////////////////////////////////////// INITIAL OBJECTS
    
    const initialForm = {
        email: "",
        name: "",
        password: "",
    }
    
    //////////////////////////////////////////////////////// STATES
    
    const [form, setForm] = useState(initialForm)
    const [confirm, setConfirm] = useState("")

    //////////////////////////////////////////////////////// HANDLERS
    const handleChange = (e) => {
        const { value, name } = e.target;

        setForm({
            ...form,
            [name]: value
        })
    }

  return (
    <div className='main-background w-screen h-screen flex flex-col items-center justify-center'>
        <h1 className="font-bold text-2xl text-white mb-4">Mercadito Universitario: UAA</h1>
        <div className="w-[90%] h-[50%] md:h-auto md:w-[550px] p-5 bg-white/70 rounded shadow-2xl flex flex-col justify-center gap-2">
            <label>Email</label>
            <input required name="email" placeholder="ejemplo@gmail.com" className="input" onChange={handleChange}/>
            <label>Nombre</label>
            <input required name="name" className="input" onChange={handleChange}/>
            <label>Contraseña</label>
            <input required name="password" placeholder="*********" className="input" type="password" onChange={handleChange}/>
            <label>Confirme Contraseña</label>
            <input required placeholder="*********" className="input" type="password" onChange={(e) => setConfirm(e.target.value)}/>
            { form.password === confirm ? ( <></> ) : ( <p className="red-button text-white font-bold">Las contraseñas no coinciden</p> ) }
            <button className="mt-5 blue-button text-white" disabled={form.password === confirm ? false : true}>Registrarse</button>
            <Link className="mt-5 text-center underline" href={'/login'}>Ya tienes una cuenta? Inicia sesión aquí</Link>
        </div>
    </div>
  )
}

export default page