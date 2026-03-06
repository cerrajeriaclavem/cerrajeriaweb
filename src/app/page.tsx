import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box component="main">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingContact />
    </Box>
  );
}
