/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // Si tienes otros dominios de imágenes, agrégalos aquí:
      // { protocol: 'https', hostname: 'misimagenes.com' },
    ],
  },
};

module.exports = nextConfig;
