/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/schools',
        destination: '/admin/schools',
        permanent: false,
      },
      {
        source: '/rankings',
        destination: '/school/rankings',
        permanent: false,
      },
      {
        source: '/dashboard',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/profile',
        destination: '/school/profile',
        permanent: false,
      },
      {
        source: '/assessment',
        destination: '/school/assessment',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
