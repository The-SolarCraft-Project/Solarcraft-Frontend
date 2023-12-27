/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '5dde29d76fbf70687fe113c9743275df.ipfscdn.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}
module.exports = nextConfig;


// https://5dde29d76fbf70687fe113c9743275df.ipfscdn.io/ipfs/bafybeigrrecw6x7pklfrur2mdafu3ppowocuivtgtljhfjlerlfa4jiuwq/