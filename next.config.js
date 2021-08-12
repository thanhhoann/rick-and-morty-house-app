const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
  images: {
    domains: [
      "rickandmortyapi.com",
      "www.freeiconspng.com",
      "images5.alphacoders.com",
      "images.alphacoders.com",
    ],
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
