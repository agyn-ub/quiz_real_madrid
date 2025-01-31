/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't.me',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.telegram-cdn.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn5.telegram-cdn.org',
      },
    ],
  },
}

module.exports = nextConfig 