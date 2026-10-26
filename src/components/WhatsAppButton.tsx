'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { trackWhatsAppConversion } from '@/lib/gtag';

// Mensaje que llega precargado en el chat cuando el enlace no define uno propio.
const DEFAULT_MESSAGE = 'Hola! Te contacto desde la web, quería consultarte por un presupuesto';

// Agrega el texto predefinido a un enlace wa.me, salvo que ya traiga su propio ?text=.
function withDefaultMessage(href?: string) {
  if (!href || !href.startsWith('https://wa.me/') || /[?&]text=/.test(href)) {
    return href;
  }
  const separator = href.includes('?') ? '&' : '?';
  return `${href}${separator}text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
}

type WhatsAppButtonProps = ButtonProps<'a'> & {
  // Componente a renderizar en lugar de Button (ej. Fab o Paper) cuando el
  // diseño del enlace no es un botón común.
  as?: React.ElementType;
};

// Enlace de WhatsApp con seguimiento de conversión de Google Ads incorporado.
// Se usa en lugar de <Button href="https://wa.me/..."> para poder registrar
// el evento también desde Server Components. El clic no se frena: el enlace
// se abre normalmente y el evento se envía por beacon.
export default function WhatsAppButton({ as, onClick, href, ...props }: WhatsAppButtonProps) {
  const Component: React.ElementType = as ?? Button;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackWhatsAppConversion();
    onClick?.(event);
  };

  return <Component component="a" onClick={handleClick} href={withDefaultMessage(href)} {...props} />;
}
