import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { YesNoContract } from "./contractConfig";
import Share from "./Interactions/Share"; 



const Voting = ({ isConnected, showWalletModal }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalVotesYes, setTotalVotesYes] = useState(0);
  const [totalVotesNo, setTotalVotesNo] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Monad Testnet network data
  const monadTestnet = {
    chainId: "0x279F", // 10143 in hexadecimal
    chainName: "Monad Testnet",
    nativeCurrency: {
      name: "MON",
      symbol: "MON",
      decimals: 18,
    },
    rpcUrls: ["https://testnet-rpc.monad.xyz"],
    blockExplorerUrls: ["https://testnet.monadexplorer.com"],
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            YesNoContract.address,
            YesNoContract.abi,
            signer
          );

          setProvider(provider);
          setSigner(signer);
          setContract(contract);

          const yesVotes = await contract.getTotalVotes(1);
          const noVotes = await contract.getTotalVotes(2);
          setTotalVotesYes(yesVotes.toString());
          setTotalVotesNo(noVotes.toString());

          const network = await provider.getNetwork();
          if (Number(network.chainId) !== Number(monadTestnet.chainId)) {
            alert("Please switch to the Monad Testnet to vote.");
            await switchToMonadTestnet();
          }
        } else {
          console.error("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    if (isConnected) init();
  }, [isConnected]);

  const switchToMonadTestnet = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [monadTestnet],
      });
    } catch (error) {
      console.error("Error switching to Monad Testnet:", error);
    }
  };

  const vote = async (variantId) => {
    if (!isConnected) {
      showWalletModal(); // Show wallet connection modal
      return;
    }

    if (!contract) return;

    try {
      setIsLoading(true);
      const tx = await contract.vote(variantId);
      await tx.wait();

      const yesVotes = await contract.getTotalVotes(1);
      const noVotes = await contract.getTotalVotes(2);
      setTotalVotesYes(yesVotes.toString());
      setTotalVotesNo(noVotes.toString());

      setIsLoading(false);
      document.getElementById("vote_result").classList.remove("hide");
      setShowModal(true); 
    } catch (error) {
      console.error("Error voting:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="wrap_yesno py-5">
      <div className="d-flex justify-content-center position-relative">
        <button
          onClick={() => vote(1)}
          className="me-4 btn-y button"
          disabled={!isConnected || isLoading}
        >
          YES
        </button>
        <button
          onClick={() => vote(2)}
          className="ms-4 btn-n button"
          disabled={!isConnected || isLoading}
        >
          NO
        </button>

        {isLoading && (
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ zIndex: 1000 }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <div id="vote_result" className="hide mt-3">
        <center>
          <p>Total YES Votes: {totalVotesYes}</p>
          <p>Total NO Votes: {totalVotesNo}</p>
        </center>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
          <div className="modal-dialog">
            
          <div className="d-flex flex-row-reverse">      
			<button
			  type="button"
			  className="close_success"
			  onClick={() => setShowModal(false)}
			>
			  &times;
			</button>
          </div>

          <div className="modal-body">
            <h3>Would you like to share </h3>
            <h1>what question you were answering</h1>
            <h3 className='mb-5'>when you clicked the button?</h3>
            <Share />
          </div>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default Voting;