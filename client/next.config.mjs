/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "somehost",
      },
    ],
  },
};

export default nextConfig;
