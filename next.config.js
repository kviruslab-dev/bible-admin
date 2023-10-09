/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  cleanDistDir: true,
  trailingSlash: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
    // appDir: true,
    // modularizelmports: {
    //   'react-hook-form': { transform: 'react-hook-form/dist/{{member}}' },
    // },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: ['jsx', 'tsx', 'mdx', 'js', 'ts'],
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
