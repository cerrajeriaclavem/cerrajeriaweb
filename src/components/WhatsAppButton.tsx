'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { trackWhatsAppConversion } from '@/lib/gtag';

type WhatsAppButtonProps = ButtonProps<'a'> & {
  // Componente a renderizar en lugar de Button (ej. Fab o Paper) cuando el
  // diseño del enlace no es un botón común.
  as?: React.ElementType;
};

// Enlace de WhatsApp con seguimiento de conversión de Google Ads incorporado.
// Se usa en lugar de <Button href="https://wa.me/..."> para poder registrar
// el evento también desde Server Components. El clic no se frena: el enlace
// se abre normalmente y el evento se envía por beacon.
export default function WhatsAppButton({ as, onClick, ...props }: WhatsAppButtonProps) {
  const Component: React.ElementType = as ?? Button;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackWhatsAppConversion();
    onClick?.(event);
  };

  return <Component component="a" onClick={handleClick} {...props} />;
}
