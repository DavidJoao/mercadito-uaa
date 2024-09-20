'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { authenticate, logSession } from "../lib/actions/session"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const page = () => {
  ///////////////////////////////////////////// VARIABLES

  const router = useRouter();

  ///////////////////////////////////////////// INITIAL OBJECTS

  const initialFormData = {
    email: "",
    password: "",
  }

    ///////////////////////////////////////////// STATES
    
    const [formData, setFormData] = useState(initialFormData)
    const [session, setSession] = useState(null)
    
    ///////////////////////////////////////////// HANDLERS

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleAuthentication = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
        redirectTo: '/home'
      })
      router.refresh();
    } catch (error) {
      if (error) {
        switch (error.type) {
            case 'CredentialsSignin':
                return error;
            default:
                return error
        }
    }
    throw error;
    }
  }

    ///////////////////////////////////////////// AUTH SESSION

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
        <form className="w-[90%] h-[50%] md:h-auto md:w-[550px] p-5 bg-white/70 rounded shadow-2xl flex flex-col justify-center gap-2" onSubmit={(e) => handleAuthentication(e)}>
            <label>Email</label>
            <input required name="email" placeholder="ejemplo@gmail.com" className="input" onChange={handleChange}/>
            <label>Contraseña</label>
            <input required name="password"placeholder="*********" className="input" type="password" onChange={handleChange}/>
            <button type="submit" className="mt-5 blue-button text-white">Iniciar Sesión</button>
            <Link className="mt-5 text-center underline" href={'/signup'}>No tienes una cuenta? Crea una aquí</Link>
        </form>
    </div>
  )
}

export default page