import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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

    // Ensure ProvidePlugin is used correctly
    config.plugins.push(
      new config.webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_API_KEY': JSON.stringify(process.env.NEXT_PUBLIC_API_KEY),
        'process.env.NEXT_PUBLIC_API_SECRET': JSON.stringify(process.env.NEXT_PUBLIC_API_SECRET),
      }),
      new (require('webpack').ProvidePlugin)({
        Buffer: ['buffer', 'Buffer'],
      })
    );

    return config;
  },
};

export default nextConfig;
