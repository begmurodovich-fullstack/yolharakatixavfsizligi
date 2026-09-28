/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled for production (avoids double-rendering)
  
  // Production performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header (security)
  compress: true,         // Enable gzip compression
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // Cache images 24 hours
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // HTTP headers for security and caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // URL redirects
  async redirects() {
    return [
      { source: '/schools', destination: '/admin/schools', permanent: false },
      { source: '/rankings', destination: '/school/rankings', permanent: false },
      { source: '/dashboard', destination: '/login', permanent: false },
      { source: '/profile', destination: '/school/profile', permanent: false },
      { source: '/assessment', destination: '/school/assessment', permanent: false },
      { source: '/admin/evidence', destination: '/admin/assessments', permanent: false },
    ];
  },

  // Webpack bundle optimization
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
