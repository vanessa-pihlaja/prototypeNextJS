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
            },
            {
                hostname: 'viimeistamuruamyoten.com'
            }
        ]
    }
};

export default nextConfig;