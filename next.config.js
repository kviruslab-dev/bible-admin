/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  cleanDistDir: true,
  trailingSlash: true,
  swcMinify: true,
  images: {
    // loader: 'akamai',
    domains: ['data.bible25.com', '*'],
  },
  experimental: {
    esmExternals: true,
    serverActions: true,
    // appDir: true,
    // modularizelmports: {
    //   'react-hook-form': { transform: 'react-hook-form/dist/{{member}}' },
    // },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: ['tsx', 'ts'],
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
