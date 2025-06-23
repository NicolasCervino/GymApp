/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "d205bpvrqc9yn1.cloudfront.net",
      "ucqttqvpdrqpphrvxlmy.supabase.co",
      "api.exercisedb.io"
    ],
  },
};

module.exports = nextConfig;
