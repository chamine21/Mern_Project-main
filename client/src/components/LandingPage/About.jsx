import React from 'react'

const About = () => {
  return (
    <div className='w-full h-screen'>
    <img
      className='top-10 left-0 w-full h-screen object-cover'
      src='https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg'
      alt='/'
    />
   
    
    <div className='bg-black/30 relative top-10 left-0 w-full h-screen group' />
    <div className='relative top-[-200%] w-full h-full flex flex-col justify-center text-white'>
      <div className='md:left-[10%] max-w-[1100px] m-auto relative p-4'>
     
        <h1 className='font-bold text-5xl md:text-7xl drop-shadow-2xl'>
        Invertigate All corners of the world with Us
                  </h1>
        <p className='max-w-[600px] drop-shadow-2xl py-2 text-xl'>
        At our website,we pride ourselves on providing personalizedre commandations for the best hotel destinations in the world.
          We understand that choosing the right hotel can make your vacation and we wante to make sure you have the best experience.
         We go beyond just listing hotels ,we curate a selection of unique and exceptional proporties that will make you trip unforgettable.let us help you discover the world's best hotels today .
</p>
      </div>
    </div>
  </div>
  )
}

export default About