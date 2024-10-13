import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import webpack from 'webpack'; // Import Webpack directly

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_SECRET: process.env.NEXT_PUBLIC_API_SECRET,
  },
  webpack: (config) => {
    // Polyfill Buffer for browser
    config.resolve.fallback = {
      buffer: require.resolve('buffer'),
    };

    // Add Webpack plugins
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_API_KEY': JSON.stringify(process.env.NEXT_PUBLIC_API_KEY),
        'process.env.NEXT_PUBLIC_API_SECRET': JSON.stringify(process.env.NEXT_PUBLIC_API_SECRET),
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    );

    return config;
  },
};

export default nextConfig;
