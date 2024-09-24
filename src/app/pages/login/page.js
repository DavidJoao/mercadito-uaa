'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { authenticate, logSession } from "../../lib/actions/session"
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
    const [errorMessage, setErrorMessage] = useState("")
    
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
    setErrorMessage("")

    try {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        redirectTo: '/pages/home',
      })
      .then(res => {
        if ( res.error ) {
          setErrorMessage("El correo o contraseña no son correctos.")
        } else {
          router.replace('/pages/home')
        }
      })
      router.refresh();
    } catch (error) {
      if (error) {
        switch (error.type) {
            case 'CredentialsSignin':
                return error
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
            router.push('/pages/home');
          }
        } catch (error) {
          console.error("Error fetching session", error);
        }
      };
      checkSession();
    }, [router]);


  return (
    <div className='main-background w-screen h-screen flex flex-col items-center justify-center'>
          <div className="w-[90%] md:w-[550px] p-5 rounded-3xl bg-white/60 flex flex-col justify-center shadow-2xl mb-3">
            <h1 className="font-bold text-2xl text-center">Mercadito Virtual: UAA</h1>
            <p className="text-center"> Este mercado tiene como objetivo principal favorecer a los estudiantes, ofreciendo una plataforma donde puedan comprar y vender productos y servicios de manera segura y conveniente. Tu participación es crucial para entender mejor tus necesidades y preferencias. ¡Gracias por tu colaboración!</p>
          </div>
        <form className="w-[90%] h-[50%] md:h-auto md:w-[550px] p-5 bg-white/70 rounded shadow-2xl flex flex-col justify-center gap-2" onSubmit={(e) => handleAuthentication(e) }>
            <label>Email</label>
            <input required name="email" placeholder="ejemplo@gmail.com" className="input" onChange={handleChange}/>
            <label>Contraseña</label>
            <input required name="password"placeholder="*********" className="input" type="password" onChange={handleChange}/>
            <button type="submit" className="mt-5 blue-button text-white">Iniciar Sesión</button>
            <p className="mx-auto text-red-500">{errorMessage}</p>
            <Link className="text-center underline" href={'/pages/signup'}>No tienes una cuenta? Crea una aquí</Link>
        </form>
    </div>
  )
}

export default page