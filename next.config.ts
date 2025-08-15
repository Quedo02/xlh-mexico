/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // Otros dominios de imágenes externos:
      // { protocol: 'https', hostname: 'misimagenes.com' },
    ],
  },
};

module.exports = nextConfig;
