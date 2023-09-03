import React from 'react';
import video from './static/img/video.mp4'
const Hero = () => {
  return (
    <div className='w-full h-screen'>

     <video  className='top-0 left-0 w-full h-screen object-cover' src={video} type="video/mp4" autoPlay muted loop></video>
      
      <div className='bg-black/30 absolute top-0 left-0 w-full h-screen' />
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-white'>
        <div className='md:left-[10%] max-w-[1100px] m-auto absolute p-4'>
       
          <h1 className='font-bold text-5xl md:text-7xl drop-shadow-2xl'>
          Enjoy Travel
          </h1>
          <p className='max-w-[600px] drop-shadow-2xl py-2 text-xl'>
          Enjoy the holidays with booking.
            Our Website is dedicated to helping you find the best destination hotels in the world.
            We understand that choosing the right hotel can make your vacation and we wante to make sure you have the best experience.
          </p>
          <p className='max-w-[600px] drop-shadow-2xl py-2 text-xl'>
          So Why Wait? Start exploring our website today and discover the world's best destinations and hotels personalized just for you.
        </p>
          <button className='bg-white text-black '>Get started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
