import { useState } from "react";

// package that allows us to connect to blockchain
// ethers is alternative to web3.js
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "./RoboPunksNFT.json";

const roboPunksNFTAddress = "0xa0C8c0109043C2f09732E48eeE0FdE2DD57762b8";

const MainMint = ({ accounts, setAccounts }) => {
  // useState updated via setMintAmount
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      // provides a way for ethers to connect to blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // signer necessary for transactions
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );
      try {
        // runs mint function from contracts
        // solidity req bignum to use
        // whenever we make a function call that requires ether amount, make sure to pass in as a value
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response:", response);
      } catch (err) {
        console.log("err:", err);
      }
    }
  }

  // decrease button
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  // increment button, max 3
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Digital Unicorn</h1>
      <br />
      <p>Stackathon Project: Web3 Website </p>
      <p>Let's start minting</p>
      <br />
      <br />

      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}> - </button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}> + </button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>Please connect account to start minting</p>
      )}
    </div>
  );
};

export default MainMint;
