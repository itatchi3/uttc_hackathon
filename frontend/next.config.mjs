/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { dirs: ["./src"] },
};

export default nextConfig;
