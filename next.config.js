/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org', 'cloud.appwrite.io', "images.unsplash.com", "mosaic.scdn.co", "misc.scdn.co"]
    },
    async redirects() {
        return [
            {
                source: '/settings',
                destination : '/settings/profile',
                permanent: true,
            }
        ]
    },
    async rewrites() {
        return [
            {
              source: '/@:user',
              destination: '/profile/:user',
            }
        ]
    }
}

module.exports = nextConfig