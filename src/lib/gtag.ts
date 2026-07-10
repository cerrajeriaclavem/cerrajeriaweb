// ID de la cuenta de Google Ads (etiqueta global gtag.js).
export const GOOGLE_ADS_ID = "AW-18008863756";

// Etiqueta (label) de la acción de conversión "Clic en botón Llamar (sitio web)".
const PHONE_CALL_CONVERSION_LABEL = "xS6NCODgks4cEIzopYtD";

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
