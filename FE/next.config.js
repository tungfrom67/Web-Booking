/** @type {import('next').NextConfig} */
module.exports = {
  serverRuntimeConfig: {
    https: {
      key: './localhost+2-key.pem',
      cert: './localhost+2.pem',
    },
  },
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'https://localhost:8000/:path*',
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
      {
        source: '/auth/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};