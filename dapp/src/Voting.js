import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { YesNoContract } from "./contractConfig";
import Share from "./Interactions/Share";
import { createWeb3User, createConnect, createVoting } from "./api";

const Voting = ({ isConnected, showWalletModal }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalVotesYes, setTotalVotesYes] = useState(0);
  const [totalVotesNo, setTotalVotesNo] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAccount, setUserAccount] = useState("");

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

          const address = await signer.getAddress();
          setUserAccount(address);

          // Send wallet address to Django backend
          await createWeb3User(address);
          await createConnect(address);

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
      console.log("Wallet is disconnected. Showing reminder modal.");
      setShowReminder(true);
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

      // Debugging: Log the voting data
      console.log("Sending voting data to backend:", {
        voice: variantId === 1,
        address: userAccount,
      });

      // Send voting data to Django backend
      await createVoting(variantId === 1, userAccount);

      setIsLoading(false);
      document.getElementById("vote_result").classList.remove("hide");
      console.log("Showing success modal"); // Debugging
      setShowModal(true); // Show success modal
    } catch (error) {
      console.error("Error voting:", error.response ? error.response.data : error);
      setIsLoading(false);
    }
  };

  return (
    <div className="wrap_yesno py-5">
      <div className="d-flex justify-content-center position-relative">
        <button
          onClick={() => vote(1)}
          className="me-4 btn-y button"
          disabled={isLoading}
        >
          YES
        </button>
        <button
          onClick={() => vote(2)}
          className="ms-4 btn-n button"
          disabled={isLoading}
        >
          NO
        </button>

        {isLoading && (
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ zIndex: 1000 }}
          >


            <div class="spinner-box">
              <div class="leo-border-1">
                <div class="leo-core-1"></div>
              </div> 
              <div class="leo-border-2">
                <div class="leo-core-2"></div>
              </div> 
            </div>


          </div>
        )}
      </div>

      <div id="vote_result" className="hide mt-5">
     	<div className="d-flex justify-content-center">
        
          <h4 className="me-5">Total YES: {totalVotesYes}</h4>
          <h4 className="ps-3">Total NO: {totalVotesNo}</h4>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
          	<div className="modal-dialog">
	          	<div className="modal-content">
	            
	              	<button
	                type="button"
	                className="close_success"
	                onClick={() => setShowModal(false)}
	              	>
	                &times;
	              	</button>

	            	<div className="modal-body">
						<h3>Would you like to share </h3>
						<h1>what question you were answering</h1>
						<h3 className="mb-5">when you clicked the button?</h3>
						<Share userAccount={userAccount} />
		            </div>
		        </div>

            </div>
        </div>
      )}


      {showReminder && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(255, 165, 0, 0.5)" }}>
            <div className="modal-dialog">        
              
	            <div className="modal-content">
			        <button
			          type="button"
			          className="close_success"
			          onClick={(e) => {
			            e.stopPropagation();
			            console.log("Closing reminder modal"); // Debugging
			            setShowReminder(false);
			          }}
			        >
			          &times;
			        </button>
			        <div className="modal-body">
			          <h2>Connect the wallet, please!</h2>
			        </div>
		      	</div>
		      	
          	</div>
        </div>
      )}
    </div>
  );
};

export default Voting;