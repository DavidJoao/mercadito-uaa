"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuth from '@/app/hooks/useAuth';
import { BsSearch, BsArrowRightCircle } from "react-icons/bs";

const Page = () => {

  ///////////////////////////////////////////////////// VARIABLES
  const session = useAuth();

  
  ///////////////////////////////////////////////////// INITIAL OBJECTS
  const initialFormData = {
    author: session & session?.user?.name,
    authorId: session & session?.user?.id,
    title: "",
    description: "",
    phone: "",
    price: "",
    images: [],
    instagram: "",
    date: ""
  }
  
  ///////////////////////////////////////////////////// STATES
  const [formData, setFormData] = useState(initialFormData);
  const [selectedImages, setSelectedImages] = useState([])

  console.log(selectedImages)
  console.log(formData)

  ///////////////////////////////////////////////////// HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    setSelectedImages(e.target.files);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const postData = new FormData();
    postData.append("author", session?.user?.name);
    postData.append("authorId", session?.user?.id);
    postData.append("phone", formData.phone);
    postData.append("description", formData.description);
    postData.append("instagram", formData.instagram);
    postData.append("date", formData.date);
    postData.append("price", formData.price);
    postData.append("title", formData.title);

    Array.from(selectedImages).forEach((image) => {
      postData.append("images", image)
    })

    try {
      const res = await fetch('/api/posts/post', { method: 'POST', body: postData })
      const data = await res.json();

      if (res.ok) {
        return "Post Successfully Created!"
      } else {
        return "Error Creating Post"
      }
    } catch (error) {
      console.error("Error Submitting Form", error)
    }
  }


  if (session === null) {
    return <div>Loading...</div>;
  }

  return (
    // TOP PADDING BECAUSE OF NAVBAR
    <div className='bg-slate-400 h-screen w-[screen] pt-[40px] pl-[20px] pr-[20px] pb-[40px] flex flex-col md:flex-row'>
      {/* POSTS CONTAINER */}
      <div className='container w-[75%] flex flex-col'>
        {/* SEARCH */}
        <div className='w-full p-3 flex flex-col gap-1 rounded-xl'>
          <div className='flex flex-row items-center justify-center rounded-lg p-2 gap-2'>
            <BsSearch className='text-xl'/>
            <input className='input w-[350px]'/>
            <button><BsArrowRightCircle className='text-xl'/></button>
          </div>
          <p className='rounded-lg p-2 text-center shadow-xl'>Artículos Recientemente Publicados</p>
        </div>

        {/* POSTS */}
        <div className='h-full p-3'>

        </div>
      </div>
      
      {/* POST NEW ITEM CONTAINER */}
      <div className='container w-[25%] p-4'>
        <p className='text-center border rounded-lg p-1'>Publicar Artículo</p>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label>Título</label>
          <input required name='title' className='input' onChange={handleChange}/>
          <label>Precio</label>
          <input required name='price' className='input' onChange={handleChange}/>
          <label>Descripción</label>
          <textarea required name='description' className='input resize-none h-[100px]' onChange={handleChange}/>
          <label>Foto(s)</label>
          <input required name='images' className='input border bg-white' type='file' multiple max={5} onChange={handleFileChange}/>
          <div className='border p-2 rounded-lg mt-3'>

          </div>
          <label>Teléfono</label>
          <input required name='phone' className='input' type='phone' onChange={handleChange}/>
          <label>Instagram</label>
          <input required name='instagram' className='input' onChange={handleChange}/>
          <button type='submit' className='blue-button text-white mt-2'>Publicar</button>
        </form>
      </div>
    </div>
  )
}

export default Page