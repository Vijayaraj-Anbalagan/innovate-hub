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
};

export default nextConfig;
