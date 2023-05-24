import * as IPFS from "ipfs-http-client";

const uploadToIPFS = async () => {
  const ipfs = IPFS({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https",
  });
  try {
    const fileAdded = await ipfs.add("../public/GLB/sun.glb");
    const fileCID = fileAdded.cid.toString();
    console.log('File uploaded successfully. CID:', fileCID);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

module.exports = { uploadToIPFS };
