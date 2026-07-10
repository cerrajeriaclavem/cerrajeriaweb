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

// Envía a Google Ads el evento de conversión al hacer clic en "Llamar a la empresa".
export function trackPhoneCallConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${PHONE_CALL_CONVERSION_LABEL}`,
  });
}
