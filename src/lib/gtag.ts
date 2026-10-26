// ID de la cuenta de Google Ads (etiqueta global gtag.js).
export const GOOGLE_ADS_ID = "AW-18008863756";

// Etiqueta (label) de la acción de conversión "Clic en botón Llamar (sitio web)".
const PHONE_CALL_CONVERSION_LABEL = "xS6NCODgks4cEIzopYtD";

// Etiqueta (label) de la acción de conversión "Clic en WhatsApp (sitio web)".
const WHATSAPP_CONVERSION_LABEL = "sGl5CKH4nqodEIzopYtD";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const PHONE_URL = "tel:1136219993";

// Envía a Google Ads el evento de conversión al hacer clic en "Llamar a la
// empresa". Retrasa la navegación al enlace tel: hasta que el evento se
// haya enviado (o venza el timeout), tal como recomienda Google, para que
// el sistema operativo no corte el pedido de red al abrir el marcador.
export function trackPhoneCallConversion(event: React.SyntheticEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  event.preventDefault();

  const navigateToPhone = () => {
    window.location.href = PHONE_URL;
  };

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${PHONE_CALL_CONVERSION_LABEL}`,
    event_callback: navigateToPhone,
    event_timeout: 2000,
  });
}

// Envía a Google Ads el evento de conversión al hacer clic en un enlace de
// WhatsApp. A diferencia de la llamada, no frena la navegación: el enlace se
// abre normalmente (en otra pestaña o en la app) y el evento viaja con
// transport_type "beacon", que sobrevive a la apertura de la nueva ventana.
// Usar preventDefault con una apertura diferida haría que el navegador la
// bloquee como popup.
export function trackWhatsAppConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${WHATSAPP_CONVERSION_LABEL}`,
    transport_type: "beacon",
  });
}
