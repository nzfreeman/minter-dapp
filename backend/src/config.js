require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "BelleKaiJH";
const description = "This is a tast of BelleKaiJH production, Please enjoy the selection and feel free to give us a feedback. More project will coming later but before the end of year ";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
  {
    growEditionSizeTo: 1000,    // upto 5,000 to use NFT Port API, make it 2 x 5000, and mint twice
    
    layersOrder: [
      { name: "01background" },
      { name: "02body" },
      { name: "04earings" },
      { name: "05scar" },
      { name: "06eyes" },
      { name: "07sunglass" },
      { name: "09mouth" },
      { name: "10nose" },
      { name: "08hair" },
      { name: "11power" },

    ],
  },
];

const shuffleLayerConfigurations = true;  

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const extraMetadata = {
  external_url: "http:///138.2.125.205/", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'goerli'; // only goerli, polygon, or ethereum // after deployed, can't change this. 

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'BelleKaiJH Production 1';
const CONTRACT_SYMBOL = 'BKJH';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xa50DdCf6Cef25a38130B38206c5BdD16f8409A2e';
const TREASURY_ADDRESS = '0xa50DdCf6Cef25a38130B38206c5BdD16f8409A2e';//this is the address for withdrawing 
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.01; // Minting price per NFT. Goerli = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 5; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2023-04-03T00:00:00+11:00"; // This is required. Eg: 2023-07-08T11:30:48+00:00  We Can update this later. 

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2023-03-30T00:00:00+11:00"; // Optional. Eg: 2023-07-08T11:30:48+00:00
const ROYALTY_SHARE = 500; // Percentage of the token price that goes to the royalty address. 300bps = 3%, 100 bps = 1%   
const ROYALTY_ADDRESS = "0x1Cb505d7637335b8bf8137778e6fD4EB4B4C1037"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri/  This is for real NFT meta data location. 
//To reveal NFT later, Just leave it null

const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
                                  // This is is for prereveal NFT (리빌전 보이는 이미지) 
const PRESALE_WHITELISTED_ADDRESSES = ["0x241444773a9cd8D7c12F580759EA55c3C7bfC7f3",
                                       "0xa50DdCf6Cef25a38130B38206c5BdD16f8409A2e",
                                       "0xF6a279a6AaAB89D47ef34291BCB386D0b2C84366",
                                       "0xebd8ad57274d9AE5389510BAC42cBeeFF4A46F0c"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it
                                               //If we already have a contract, we can reuse it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
                      //  We need to test first                    

const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which one you will get? "; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafkreic5so6lkcyvirm6rvwilwstdnzti2nz27xyyty4awd2mhvaulmj3e"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 500, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "http://138.2.125.205",
  creators: [
    {
      address: "0xF6a279a6AaAB89D47ef34291BCB386D0b2C84366",
      share: 60,
      address: "0xebd8ad57274d9AE5389510BAC42cBeeFF4A46F0c",
      share: 20,
      address: "0xa50DdCf6Cef25a38130B38206c5BdD16f8409A2e",
      share: 10,
      address: "0x241444773a9cd8D7c12F580759EA55c3C7bfC7f3",
      share: 10,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
