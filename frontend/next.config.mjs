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
            },
            {
                hostname: 'ottolenghi.co.uk'
            }
        ]
    }
};

export default nextConfig;