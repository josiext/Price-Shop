/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com", "www.ikea.com", "localhost"],
  },
};

module.exports = nextConfig;
