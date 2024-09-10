'use client'

import Link from "next/link"
import { useState } from "react"

const page = () => {

  ///////////////////////////////////////////// INITIAL OBJECTS

  const initialForm = {
    email: "",
    password: "",
  }

    ///////////////////////////////////////////// STATES
    
    const [form, setForm] = useState(initialForm)
    
    ///////////////////////////////////////////// HANDLERS

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name] : value
    })
  }

  return (
    <div className='main-background w-screen h-screen flex flex-col items-center justify-center'>
        <h1 className="font-bold text-2xl text-white mb-4">Mercadito Universitario: UAA</h1>
        <div className="w-[90%] h-[50%] md:h-auto md:w-[550px] p-5 bg-white/70 rounded shadow-2xl flex flex-col justify-center gap-2">
            <label>Email</label>
            <input required name="email" placeholder="ejemplo@gmail.com" className="input" onChange={handleChange}/>
            <label>Contraseña</label>
            <input required name="password"placeholder="*********" className="input" type="password" onChange={handleChange}/>
            <button className="mt-5 blue-button text-white">Iniciar Sesión</button>
            <Link className="mt-5 text-center underline" href={'/signup'}>No tienes una cuenta? Crea una aquí</Link>
        </div>
    </div>
  )
}

export default page