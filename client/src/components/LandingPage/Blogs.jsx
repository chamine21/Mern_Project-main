import React from 'react'
import intro from '../LandingPage/static/img/intro.jpg'
const Blogs = () => {
  return (
    <div>
          <div className='w-full h-screen'>
    <img
      className='top-10 left-0 w-full h-screen object-cover'
      src={intro}
      alt='/'
    />
   
    
    <div className='bg-black/30 relative top-10 left-0 w-full h-screen group' />
    <div className='relative top-[-200%] w-full h-full flex flex-col justify-center text-white'>
      <div className='md:left-[10%] max-w-[1100px] m-auto relative p-4'>
     
        <h1 className='font-bold text-5xl md:text-7xl drop-shadow-2xl'>
        Welcome to Our Blog                  </h1>
        <p className='max-w-[600px] drop-shadow-2xl py-2 text-xl text-white'>
        Our blog is dedicated to provide you with the latest information on the best destinations hotel around the world. We are specialized in providing detailed reviews and recommendations to help you plan your next vacation.        
</p>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Blogs