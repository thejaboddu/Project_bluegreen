/** @type{import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    reactStrictMode: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    //ignoreDuringBuilds: true,
  },
  // async redirects() {
  //   return [{
  //     source: '/',
  //     destination: '/admin',
  //     permanent: true,
  //   }, ]
  // },
}

module.exports = nextConfig
