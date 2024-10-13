// next.config.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
      NEXT_PUBLIC_API_SECRET: process.env.NEXT_PUBLIC_API_SECRET,
    },
    webpack: (config) => {
        config.resolve.fallback = {
          buffer: require.resolve('buffer'),
          // Add other fallbacks as necessary
        };
        config.plugins.push(
            new config.webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        );
        return config;
      },
};

export default nextConfig;
