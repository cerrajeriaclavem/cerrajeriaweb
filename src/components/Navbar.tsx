'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyIcon from '@mui/icons-material/Key';

const navItems = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Opiniones', id: 'opiniones' },
  { label: 'Contacto', id: 'contacto' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id: string) => {
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
    <AppBar 
      position="sticky" 
      elevation={mounted && trigger ? 4 : 0}
      sx={{
        backgroundColor: mounted && trigger ? 'primary.main' : 'transparent',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: mounted && trigger ? 'none' : 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => scrollToSection('inicio')}
          >
            <KeyIcon sx={{ mr: 1, color: trigger ? 'secondary.main' : 'primary.main' }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 800, 
                color: trigger ? 'white' : 'primary.main',
                letterSpacing: 1
              }}
            >
              CLAVEM
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{ 
                  color: trigger ? 'white' : 'primary.main',
                  mx: 1,
                  fontWeight: 600,
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
              color: trigger ? 'white' : 'primary.main'
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
  );
}
