/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'images.squarespace-cdn.com'
            },
            {
                hostname: 'www.anninuunissa.fi'
            },
            {
                hostname: 'liemessa.fi'
            }
        ]
    }
};

export default nextConfig;