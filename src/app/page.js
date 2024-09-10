import Image from "next/image";
import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main-background h-screen w-screen flex flex-col items-center justify-center gap-3">
      <div className="w-[90%] md:w-[550px] p-5 rounded bg-white/60 flex flex-col justify-center shadow-2xl">
        <h1 className="font-bold text-2xl text-center">Mercadito Virtual: UAA</h1>
        <p className="text-center"> Este mercado tiene como objetivo principal favorecer a los estudiantes, ofreciendo una plataforma donde puedan comprar y vender productos y servicios de manera segura y conveniente. Tu participación es crucial para entender mejor tus necesidades y preferencias. ¡Gracias por tu colaboración!</p>
      </div>
      <div className="w-[90%] md:w-[550px] flex flex-col md:flex-row items-center justify-evenly p-5 gap-5">
        <Link href={'/login'} className="blue-button text-white w-[150px]">Iniciar Sesión</Link>
        <Link href={'/signup'} className="blue-button text-white w-[150px]">Crear Cuenta</Link>
      </div>
    </div>
  );
}
