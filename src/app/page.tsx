import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

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
