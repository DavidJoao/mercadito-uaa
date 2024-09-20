'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { registerUser } from "../lib/actions/auth"
import { useRouter } from "next/navigation"
import { logSession } from "../lib/actions/session"

const page = () => {

    const router = useRouter();

    //////////////////////////////////////////////////////// INITIAL OBJECTS
    
    const initialForm = {
        email: "",
        name: "",
        password: "",
    }
    
    //////////////////////////////////////////////////////// STATES
    
    const [form, setForm] = useState(initialForm)
    const [confirm, setConfirm] = useState("")
    const [session, setSession] = useState(null)

    //////////////////////////////////////////////////////// HANDLERS
    const handleChange = (e) => {
        const { value, name } = e.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        registerUser(form)
    }

    useEffect(() => {
        const checkSession = async () => {
          try {
            const userSession = await logSession();
            setSession(userSession); 
    
            if (userSession) {
              router.push('/home');
            }
          } catch (error) {
            console.error("Error fetching session", error);
          }
        };
        checkSession();
      }, [router]);

  return (
    <div className='main-background w-screen h-screen flex flex-col items-center justify-center'>
        <h1 className="font-bold text-2xl text-white mb-4">Mercadito Universitario: UAA</h1>
        <div className="w-[90%] h-[50%] md:h-auto md:w-[550px] p-5 bg-white/70 rounded shadow-2xl flex flex-col justify-center gap-2">
            <form className="flex flex-col" action={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input required name="email" id="email" placeholder="ejemplo@gmail.com" className="input" onChange={handleChange}/>
                <label htmlFor="name">Nombre</label>
                <input required name="name" id="name" className="input" onChange={handleChange}/>
                <label htmlFor="password">Contraseña</label>
                <input required name="password" id="password" placeholder="*********" className="input" type="password" onChange={handleChange}/>
                <label>Confirme Contraseña</label>
                <input required placeholder="*********" className="input" type="password" onChange={(e) => setConfirm(e.target.value)}/>
                { form.password === confirm ? ( <></> ) : ( <p className="red-button text-white font-bold mt-2">Las contraseñas no coinciden</p> ) }
                <button className="mt-2 blue-button text-white" disabled={form.password === confirm ? false : true}>Registrarte</button>
                <Link className="mt-5 text-center underline" href={'/login'}>Ya tienes una cuenta? Inicia sesión aquí</Link>
                
            </form>
        </div>
    </div>
  )
}

export default page