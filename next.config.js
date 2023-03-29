const withTM = require("next-transpile-modules")(["@jitsi/react-sdk"]); // pass the modules you would like to see transpiled

module.exports = withTM({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextteammate.com",
        port: "80",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextteammate.com",
        port: "443",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextteammate.com",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
});
