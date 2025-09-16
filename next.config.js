/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
