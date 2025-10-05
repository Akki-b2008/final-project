const imageKit = require("imagekit");
const { v4: uuidv4 } = require("uuid");

const imagekit = new imageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(buffer) {
  const response = await imagekit.upload({
    file: buffer,
    fileName: uuidv4(),
    folder: "/ecommerce/products",
  });

  console.log(response);
  return {
    url: response.url,
    thumbnail: response.thumbnailUrl,
    fileId: response.fileId,
  };
}

module.exports = uploadImage;
