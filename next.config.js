/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Proxy frontend '/api/*' to backend 'http://localhost:8080/api/*' to avoid CORS during local dev
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;


