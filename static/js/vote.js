web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))

const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "variantId",
                "type": "uint256"
            }
        ],
        "name": "votedEvent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newValue",
                "type": "string"
            }
        ],
        "name": "addVariant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "variantId",
                "type": "uint256"
            }
        ],
        "name": "getTotalVotes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "variantId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

contract.options.address = "0x768E7915F734b454AE13fA25cD53c11Ad80F82f3";

const contract = new web3.eth.Contract(abi, contractAddress);

let account;
web3.eth.getAccounts().then((accounts) => {
    account = accounts[0];
    console.log("Using account:", account);
});

const variants = {
    "Yes": 1,
    "No": 2
};

function Vote(variant){
	const variantId = variants[variant];

    // Call the vote function in the smart contract
    contract.methods.vote(variantId)
        .send({ from: account })
        .on('transactionHash', (hash) => {
            console.log("Transaction hash:", hash);
        })
        .on('receipt', (receipt) => {
            console.log("Vote successful! Receipt:", receipt);
            alert(`You voted for ${variant}!`);
        })
        .on('error', (error) => {
            console.error("Error voting:", error);
            alert("Error voting. Please try again.");
        });
}


document.getElementById('yes').addEventListener('click', () => Vote("Yes"));
document.getElementById('no').addEventListener('click', () => Vote("No"));