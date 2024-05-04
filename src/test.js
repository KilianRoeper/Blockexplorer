// Imports the Alchemy SDK
const { Alchemy, Network } = require("alchemy-sdk");

// Configures the Alchemy SDK
const config = {
  apiKey: "alchemy-replit", // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

const main = async () => {
  // using the block tag "latest" to get the latest block 
  // could've used a block hash to get a particualr block as well
  let blockTagOrHash = "latest"
  const tx = "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"


  // calling the getBlock method to get the latest block
  let response = await alchemy.core.getBlock(blockTagOrHash);
  let BWT = await alchemy.core.getBlockWithTransactions(blockTagOrHash);
  let TR = await alchemy.core.getTransactionReceipt(tx)
  let balance = await alchemy.core.getBalance("vitalik.eth", "latest")


  // logging the response to the console
  //console.log(response)

  console.log(balance);
};

main();