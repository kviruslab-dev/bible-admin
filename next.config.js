/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  cleanDistDir: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  cleanDistDir: true,
  pageExtensions: ['jsx', 'tsx', 'mdx', 'js', 'ts'],
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
