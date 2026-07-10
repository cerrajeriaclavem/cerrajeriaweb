import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "cerrajeriaclavem.com.ar",
          },
        ],
        destination: "https://www.cerrajeriaclavem.com.ar/:path*",
        permanent: true,
      },
      {
        source: "/cerrajero-urgente-buenos-aires",
        destination: "/cerrajero-urgente-caba",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;