/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
      NEXT_PUBLIC_API_SECRET: process.env.NEXT_PUBLIC_API_SECRET,
    },
    webpack: (config) => {
        config.resolve.fallback = {
          buffer: require.resolve("buffer"),
          // You can add more modules here if needed
        };
        return config;
      },
};

export default nextConfig;
