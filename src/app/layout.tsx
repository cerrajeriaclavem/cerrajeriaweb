import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cerrajeriaclavem.com.ar"),

  title: "Cerrajería 24hs CABA | Cerrajero Urgente 24 Horas | Clavem",

  description:
    "Cerrajería 24 horas CABA. Apertura de puertas, autos, cajas fuertes y cambio de cerraduras. Atención urgente las 24 hs.",

  keywords: [
    "cerrajeria",
    "cerrajero",
    "24 horas",
    "urgencias",
    "caba",
    "capital federal",
    "apertura de puertas",
    "cambio de cerraduras",
    "autos",
    "cajas fuertes",
  ],

  authors: [{ name: "Fernando - Cerrajería Clavem" }],

  openGraph: {
    title: "Cerrajería Clavem | Cerrajería 24 Horas en CABA",

    description:
      "Cerrajería 24/7 en CABA. Llegamos en minutos. Aperturas, cajas fuertes, autos y más.",

    url: "https://www.cerrajeriaclavem.com.ar",

    siteName: "Cerrajería Clavem",

    locale: "es_AR",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.cerrajeriaclavem.com.ar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Ads: etiqueta global del sitio (gtag.js) para medición de conversiones */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "Locksmith",

              name: "Cerrajería Clavem",

              url: "https://www.cerrajeriaclavem.com.ar",

              telephone: "+541136219993",

              areaServed: {
                "@type": "City",
                name: "CABA",
              },

              openingHours: "Mo-Su 00:00-23:59",

              priceRange: "$$",

              description:
                "Cerrajería 24 horas en CABA. Apertura de puertas, autos, cajas fuertes y cambio de cerraduras.",
            }),
          }}
        />
      </head>

      <body className={inter.className} suppressHydrationWarning>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}