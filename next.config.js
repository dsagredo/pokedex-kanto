/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['raw.githubusercontent.com'],
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [32, 64, 96, 128, 256],
    },
};

module.exports = nextConfig;
