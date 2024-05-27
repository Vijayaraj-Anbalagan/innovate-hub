/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/innovate-hub.appspot.com/o/**',
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
     config.devtool = 'source-map'; // Use 'source-map' instead of 'eval-source-map' for better debugging
     }
     return config;
  },
};

export default nextConfig;
