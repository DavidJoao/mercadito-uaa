import Image from "next/image";
import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col-reverse md:flex-row md:flex-row">
      <div className="w-screen md:w-[60%] h-[40%] md:h-auto bg-[url('https://www.uaa.mx/portal/wp-content/uploads/2022/11/357-1024x683.jpg')] bg-no-repeat bg-cover border-[10px] border-[#002d75] shadow-right">
      </div>
      <div className="w-screen md:w-[40%] h-[60%] md:h-screen flex items-center justify-center main-background">
        <div className="w-[90%] md:w-[550px] flex flex-col items-center justify-evenly p-5 gap-10">
          <Link href={'/pages/login'} className="large-blue-button text-white w-[320px]">Iniciar Sesión</Link>
          <Link href={'/pages/signup'} className="large-blue-button text-white w-[320px]">Crear Cuenta</Link>
        </div>
      </div>
    </div>
  );
}
