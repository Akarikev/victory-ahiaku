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

      {
        hostname: "i.ibb.co",
        protocol: "https",
      },
      {
        hostname: "i.postimg.cc",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
