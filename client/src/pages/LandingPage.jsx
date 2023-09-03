import React from 'react';
import { Link } from 'react-scroll';
import About from '../components/LandingPage/About';
import Hero from '../components/LandingPage/Hero';
import Hotels from '../components/LandingPage/Hotels';
import Blogs from '../components/LandingPage/Blogs';
import ImageSlider from '../components/LandingPage/ImageSlider';
import Footer from '../components/LandingPage/Footer';
import ChatBot from '../pages/ChatBot';

const LandingPage = () => {
  return (
    <div>
 
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="hotels">
        <Hotels />
      </section>
      <section id="blogs">
        <Blogs />
      </section>
      <section>
        <ImageSlider />
      </section>
      <section id="contact">
        <Footer />
      </section>
      <ChatBot/>
    </div>
  );
};

export default LandingPage;
