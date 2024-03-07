/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'images.squarespace-cdn.com'
            }
        ]
    }
};

export default nextConfig;
