/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { dirs: ["./src"] },
};

export default nextConfig;
