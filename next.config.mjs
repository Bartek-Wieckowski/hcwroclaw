/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-waw1-1.xx.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'images.leaguerepublic.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.nhle.com',
      },
    ],
  },
};

export default nextConfig;
