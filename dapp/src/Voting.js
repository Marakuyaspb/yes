import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { YesNoContract } from "./contractConfig";

const Voting = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalVotesYes, setTotalVotesYes] = useState(0);
  const [totalVotesNo, setTotalVotesNo] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for spinner

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
          // Connect to Ethereum
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

          // Fetch initial vote counts
          const yesVotes = await contract.getTotalVotes(1);
          const noVotes = await contract.getTotalVotes(2);
          setTotalVotesYes(yesVotes.toString());
          setTotalVotesNo(noVotes.toString());

          // Check if the user is on the correct network
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

    init();
  }, []);

  // Function to switch to Monad Testnet
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
    if (!contract) return;

    try {
      setIsLoading(true); // Show spinner
      const tx = await contract.vote(variantId);
      await tx.wait();

      // Update total votes after voting
      const yesVotes = await contract.getTotalVotes(1);
      const noVotes = await contract.getTotalVotes(2);
      setTotalVotesYes(yesVotes.toString());
      setTotalVotesNo(noVotes.toString());

      // Hide spinner and show results
      setIsLoading(false);
      document.getElementById("vote_result").classList.remove("hide");
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error voting:", error);
      setIsLoading(false); // Hide spinner in case of error
    }
  };

  return (
    <div className="wrap_yesno py-5">
      <div className="d-flex justify-content-center position-relative">
        {/* Voting Buttons */}
        <button
          onClick={() => vote(1)}
          className="me-4 btn-y button"
          disabled={isLoading} // Disable buttons while loading
        >
          YES
        </button>
        <button
          onClick={() => vote(2)}
          className="ms-4 btn-n button"
          disabled={isLoading} // Disable buttons while loading
        >
          NO
        </button>

        {/* Spinner */}
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

      {/* Vote Result */}
      <div id="vote_result" className="hide mt-3">
        <center>
          <p>Total YES Votes: {totalVotesYes}</p>
          <p>Total NO Votes: {totalVotesNo}</p>
        </center>
      </div>

      {/* Modal for successful vote */}
      {showModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success!</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h1>You are voted! It is cool!</h1>
                <button className="btn btn-primary">Share at x.com now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Voting;