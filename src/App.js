import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockData, setBlockData] = useState({
    blockNumber: null,
    block: null,
    transaction: null,
    //transaction_receipt: null
    BlockWithTransactions: null
  });


  useEffect(() => {
    async function fetchData(){

      let blockTagOrHash = "latest";
      let blocks = [];

      const blocknumber = await alchemy.core.getBlockNumber();
      let block = await alchemy.core.getBlock(blockTagOrHash);
      blocks.push(block);
      const transaction = await alchemy.core.getTransactionCount("vitalik.eth");
      //const transaction_receipt = await alchemy.core.getTransactionReceipt(0xc105432b3301b56156233518656ab9aa334021e893fe5507a151c17877342b10);
      const BWT = await alchemy.core.getBlockWithTransactions(blockTagOrHash);

      setBlockData({
        blockNumber: blocknumber,
        block: blocks,
        transaction: transaction,
        //transaction_receipt: transaction_receipt
        BlockWithTransactions: BWT,
      });
    } 
    fetchData();
  });

  return (
    <div className="App">
      <div>Block Number: {blockData.blockNumber}</div>
        <div>Block: {blockData.block && blockData.block.length > 0 && (
          <div>
            <div>Block Hash: {blockData.block[0].hash}</div>
            <div>Timestamp: {blockData.block[0].timestamp}</div>
            <div>number Transactions: {blockData.block[0].transactions.length}</div>
            {/* Weitere Felder des Blocks hier einfügen */}
          </div>
        )}</div>
        <div>{blockData.BlockWithTransactions && (
          <div>
            <div>Block Transactions: {blockData.BlockWithTransactions}</div>
            <div>jizz</div>
          </div>
        )}</div>
      <div>Transaction Count: {blockData.transaction}</div>
      {/* Weitere Daten hier einfügen */}
    </div>
  );

}

export default App;
