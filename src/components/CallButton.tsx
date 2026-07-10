'use client';

import { Button, ButtonProps } from '@mui/material';
import { trackPhoneCallConversion } from '@/lib/gtag';

// Botón "Llamar" con seguimiento de conversión de Google Ads incorporado.
// Se usa en lugar de <Button href="tel:..."> para poder registrar el
// evento de conversión también desde Server Components (que no admiten
// props de tipo función como onClick).
export default function CallButton(props: ButtonProps<'a'>) {
  return <Button component="a" onClick={trackPhoneCallConversion} {...props} />;
}
