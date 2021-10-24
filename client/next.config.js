/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GAUTH_CLIENT: process.env.NEXT_PUBLIC_GAUTH_CLIENT,
  },
};
