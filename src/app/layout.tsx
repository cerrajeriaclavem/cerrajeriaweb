import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cerrajeriaclavem.com.ar"),
  title: "Cerrajería Clavem | Cerrajería 24 Horas en CABA",
  description: "Cerrajería 24/7 en CABA. Aperturas, cajas fuertes, autos y más. Llegamos en minutos. Contactame al 11-3621-9993.",
  keywords: ["cerrajeria", "cerrajero", "24 horas", "urgencias", "caba", "capital federal", "apertura de puertas", "cambio de cerraduras", "autos", "cajas fuertes"],
  authors: [{ name: "Fernando - Cerrajería Clavem" }],
  openGraph: {
    title: "Cerrajería Clavem | Cerrajería 24 Horas en CABA",
    description: "Cerrajería 24/7 en CABA. Llegamos en minutos. Aperturas, cajas fuertes, autos y más.",
    url: "https://www.cerrajeriaclavem.com.ar",
    siteName: "Cerrajería Clavem",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
