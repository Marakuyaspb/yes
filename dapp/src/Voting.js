import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from 'ethers';
import { YesNoContract } from './contractConfig';


const Voting = () => {
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [totalVotesYes, setTotalVotesYes] = useState(0);
	const [totalVotesNo, setTotalVotesNo] = useState(0);

	useEffect(() => {
	const init = async () => {
		try {
			if (typeof window.ethereum !== 'undefined') {
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
			setTotalVotesYes(yesVotes.toNumber());
			setTotalVotesNo(noVotes.toNumber());
			} else {
				console.error("Ethereum object doesn't exist!");
			}
			} catch (error) {
				console.error("Error initializing contract:", error);
			}
		};

		init();
	}, []);

	const vote = async (variantId) => {
	if (!contract) return;

	try {
		const tx = await contract.vote(variantId);
		await tx.wait();

		// Update total votes after voting
		const yesVotes = await contract.getTotalVotes(1);
		const noVotes = await contract.getTotalVotes(2);
		setTotalVotesYes(yesVotes.toNumber());
		setTotalVotesNo(noVotes.toNumber());
		} catch (error) {
		console.error("Error voting:", error);
		}
	};


	return(
		<div class="wrap_yesno py-5">
			<div className="d-flex justify-content-center">
				<button onClick={() => vote(1)} className='me-4 btn-y button'>YES</button>
				<button onClick={() => vote(2)} className='ms-4 btn-n button'>NO</button>
			</div>
			<div className="mt-3">
				<p className='hide'>Total YES Votes: {totalVotesYes}</p>
        		<p className='hide'>Total NO Votes: {totalVotesNo}</p>
			</div>
		</div>
	);
};

export default Voting;