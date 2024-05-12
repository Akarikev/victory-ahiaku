/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
