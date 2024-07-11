import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xe4EE33F790f790950E0064E0E5aC474BE36d577F';
const ABI = [
  {
    "inputs":[{"internalType":"address","name":"owner","type":"address"}],
    "stateMutability":"payable",
    "type":"constructor"
  },
  {
    "inputs":[{"internalType":"address","name":"account","type":"address"}],
    "name":"AddressInsufficientBalance",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"CommissionPoolEmpty",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"EmergencyLockIsActivated",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"FailedInnerCall",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"InvalidPercentage",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"NoAmountSent",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"NoUnclaimedPrizeFound",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"NoValidMoveMade",
    "type":"error"
  },
  {
    "inputs":[{"internalType":"address","name":"sender","type":"address"}],
    "name":"NotAuthorized",
    "type":"error"
  },
  {
    "inputs":[{"internalType":"address","name":"owner","type":"address"}],
    "name":"OwnableInvalidOwner",
    "type":"error"
  },
  {
    "inputs":[{"internalType":"address","name":"account","type":"address"}],
    "name":"OwnableUnauthorizedAccount",
    "type":"error"
  },
  {
    "inputs":[],
    "name":"ReentrancyGuardReentrantCall",
    "type":"error"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":false,"internalType":"bool","name":"stopped","type":"bool"}],
    "name":"CircuitBreakerToggled",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":true,"internalType":"address","name":"donator","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"DonationToAuthorReceived",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":true,"internalType":"address","name":"donator","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"DonationToPrizePoolReceived",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":false,"internalType":"uint256","name":"moveCount","type":"uint256"}],
    "name":"GameOver",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":false,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"enum Web3Game2048.Move","name":"move","type":"uint8"}],
    "name":"Moved",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],
    "name":"OwnershipTransferred",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[],
    "name":"TilesReset",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"moveCount","type":"uint256"}],
    "name":"YouHaveWonTheGame",
    "type":"event"
  },
  {
    "anonymous":false,
    "inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"int8","name":"prizeWon","type":"int8"},{"indexed":false,"internalType":"uint256","name":"moveCount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"winnerPrize","type":"uint256"}],
    "name":"YouWonAPrize",
    "type":"event"
  },
  {
    "inputs":[],
    "name":"AUTHOR_LINKEDIN",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"AUTHOR_NAME",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"AUTHOR_WEBSITE",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"COMMISSION_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"FIFTH_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"FIRST_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"FOURTH_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"GRAND_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"SECOND_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"SIXTH_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"THIRD_PRIZE_PERCENTAGE",
    "outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"calculatePrizesProjection",
    "outputs":[
      {"internalType":"uint256","name":"sixthWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"fifthWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"fourthWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"thirdWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"secondWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"firstWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"grandWinnerPrize","type":"uint256"},
      {"internalType":"uint256","name":"finalRemainingPrizePool","type":"uint256"}
    ],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"name","type":"string"}],
    "name":"donateToAuthor",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"name","type":"string"}],
    "name":"donateToPrizePool",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"percentage","type":"uint256"}],
    "name":"emergencyExit",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"fifthPrizeDistributed",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"firstPrizeDistributed",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"fourthPrizeDistributed",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],
    "name":"gameBoard",
    "outputs":[{"internalType":"uint16","name":"","type":"uint16"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"getCommissionPool",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"row","type":"uint256"},{"internalType":"uint256","name":"col","type":"uint256"}],
    "name":"getGameBoardTile",
    "outputs":[{"internalType":"uint16","name":"","type":"uint16"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"enum Web3Game2048.Move","name":"move","type":"uint8"}],
    "name":"makeMove",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"moveCount",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"owner",
    "outputs":[{"internalType":"address","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"prizePool",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"renounceOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"secondPrizeDistributed",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"sixthPrizeDistributed",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"stopped",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"thirdPrizeDistributed",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"toggleCircuitBreaker",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"newOwner","type":"address"}],
    "name":"transferOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"","type":"address"}],
    "name":"winnerPrizeBalance",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"withdrawCommission",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"withdrawWinnerPrize",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "stateMutability":"payable",
    "type":"receive"
  }
];

function App() {
  const [balance, setBalance] = useState(null);
  const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS);
  const [prizesProjection, setPrizesProjection] = useState({});
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const initProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(initProvider);
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setSigner(signer);

      setIsWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const getBalance = async () => {
    try {
      setLoading(true);
      const balance = await provider.getBalance(contractAddress);
      setBalance(ethers.formatEther(balance));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to fetch balance');
      setLoading(false);
    }
  };

  const calculatePrizesProjection = async () => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const projection = await contract.calculatePrizesProjection();
      setPrizesProjection({
        sixthWinnerPrize: ethers.formatEther(projection.sixthWinnerPrize),
        fifthWinnerPrize: ethers.formatEther(projection.fifthWinnerPrize),
        fourthWinnerPrize: ethers.formatEther(projection.fourthWinnerPrize),
        thirdWinnerPrize: ethers.formatEther(projection.thirdWinnerPrize),
        secondWinnerPrize: ethers.formatEther(projection.secondWinnerPrize),
        firstWinnerPrize: ethers.formatEther(projection.firstWinnerPrize),
        grandWinnerPrize: ethers.formatEther(projection.grandWinnerPrize),
        finalRemainingPrizePool: ethers.formatEther(projection.finalRemainingPrizePool),
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prizes projection:', error);
      setError('Failed to fetch prizes projection');
      setLoading(false);
    }
  };

  const makeMove = async () => {
    try {
      if (!signer) {
        setError('Wallet is not connected');
        return;
      }
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const gasLimit = await contract.estimateGas.makeMove(1);
      const tx = await contract.makeMove(1, {
        gasLimit: gasLimit.add(10000), // Add some buffer to the estimated gas limit
      });
      await tx.wait();
      console.log('Move made successfully');
    } catch (error) {
      if (error.message.includes('execution reverted')) {
        console.error('Execution reverted:', error);
        setError('Execution reverted');
      } else if (error.message.includes('insufficient funds')) {
        console.error('Insufficient funds:', error);
        setError('Insufficient funds');
      } else if (error.message.includes('nonce has already been used')) {
        console.error('Nonce expired:', error);
        setError('Nonce expired');
      } else {
        console.error('Error making move:', error);
        setError('Error making move');
      }
    }
  };

  return (
    <div className="App">
      <h1>Check ETH Balance</h1>
      <input
        type="text"
        placeholder="Enter contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <button onClick={getBalance} disabled={loading}>Get Balance</button>
      {loading && <p>Loading...</p>}
      {balance && (
        <div>
          <h2>Balance:</h2>
          <p>{balance} ETH</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={calculatePrizesProjection} disabled={loading}>Calculate Prizes Projection</button>
      {Object.keys(prizesProjection).length > 0 && (
        <div>
          <h2>Prizes Projection:</h2>
          <ul>
            {Object.entries(prizesProjection).map(([key, value]) => (
              <li key={key}>{key}: {value} ETH</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={connectWallet} disabled={loading}>
        {isWalletConnected ? 'Wallet is Connected' : 'Connect Wallet'}
      </button>
      <button onClick={makeMove} disabled={loading}>Make Move</button>
    </div>
  );
}

export default App;
