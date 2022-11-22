module.exports = {
  images: {
    minimumCacheTTL: 6,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "port-ecommerce.fly.dev",
        pathname: "/media/images/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/media/images/**",
      },
    ],
  },
};
