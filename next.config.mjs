/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: '**.media.tumblr.com'
        }]
    }
};

export default nextConfig;
