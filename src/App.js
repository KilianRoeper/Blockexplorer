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
    BlockWithTransactions: null,
  });


  useEffect(() => {
    async function fetchData(){

      let blockTagOrHash = "latest";

      const blocknumber = await alchemy.core.getBlockNumber();
      let block = await alchemy.core.getBlock(blockTagOrHash);
      const transaction = await alchemy.core.getTransactionCount("vitalik.eth");
      //const transaction_receipt = await alchemy.core.getTransactionReceipt(0xc105432b3301b56156233518656ab9aa334021e893fe5507a151c17877342b10);
      const BWT = await alchemy.core.getBlockWithTransactions(blockTagOrHash);

        setBlockData({
        blockNumber: blocknumber,
        block: block,
        transaction: transaction,
        //transaction_receipt: transaction_receipt
        BlockWithTransactions: BWT,
      });
    } 
    fetchData();
  });

  const [Balance, setBalance] = useState(null);

  const [address, setAddress] = useState('');

  const isValidAddress = (address) => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  };

  const getBalance = async () => {
    if (isValidAddress(address)) {
      let balance = await alchemy.core.getBalance(address, "latest");
      setBalance(balance);
      console.log(balance);
      //console.log(Balance);
    } else {
      alert('Ungültige Ethereum-Adresse!');
    }
  };

 /* useEffect(() => {
    console.log(Balance);
  }, [Balance]); 
*/

  return (
    <div className="App">
      <div className='h1' >Block Number: {blockData.blockNumber}</div>
      <div className='h4'>      
        <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address to get Balance!"
      />
        <button onClick={getBalance}>Submit</button>
        <div>Balance of Address {address}: {Balance ? Balance._hex : null}</div>
      </div>
      <div>Block: {blockData.block && (
        <div>
          <div>latest Block transaction number: {blockData.block.transactions.length}</div>
          <div>Block Hash: {blockData.block.hash}</div>
          <div>Timestamp: {blockData.block.timestamp}</div>
          <ul className='h2'>
            Transactions: {blockData.block.transactions.map((transaction, index) => (
              <li key={index}>
                <div className='h3'>Transaction {index + 1}</div>
                <div className='h3'>Transaction Hash: {transaction}</div>
              </li>
            ))}
            </ul>
          {/* Weitere Felder des Blocks hier einfügen */}
        </div>
      )}</div>
      <div className='h4'> Transaction Receipt: {blockData.BlockWithTransactions && (
        <div>
          <div className='h4'>Block transaction data of first included transaction: {blockData.BlockWithTransactions.transactions[0].data}</div>
        </div>
      )}
      </div>
      <div className='h4'>Vitaliks Transaction Count: {blockData.transaction}</div>
      {/* Weitere Daten hier einfügen */}
    </div>
  );

}

export default App;
