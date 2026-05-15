'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

const navItems = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Opiniones', id: 'opiniones' },
  { label: 'Contacto', id: 'contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Background opacity/styling logic
    if (currentScrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Visibility logic (Hide on scroll down, show on scroll up)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setVisible(false); // Scrolling down
    } else {
      setVisible(true); // Scrolling up or near top
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Handle mouse movement for visibility
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
      setMobileOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
  };

  return (
    <Slide in={visible} direction="down" timeout={400}>
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? 'primary.main' : 'rgba(255, 255, 255, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: scrolled ? 'none' : 'blur(12px)',
          borderBottom: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 }, height: 80 }}>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => scrollToSection('inicio')}
            >
              <Image 
                src="/images/logo.png" 
                alt="Cerrajería Clavem Logo" 
                width={scrolled ? 130 : 150} 
                height={scrolled ? 130 : 150}
                style={{ transition: 'all 0.3s ease' }}
              />
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{ 
                    color: 'white',
                    mx: 1,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: 'none' },
                color: 'white'
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: { width: 240, backgroundColor: 'primary.main', color: 'white' }
          }}
        >
          <List sx={{ pt: 4 }}>
            {navItems.map((item) => (
              <ListItem 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontWeight: 600,
                    textAlign: 'center' 
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </Slide>
  );
}
