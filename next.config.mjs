/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable React Strict Mode. This makes the code render twice, therefore making double the api calls.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
