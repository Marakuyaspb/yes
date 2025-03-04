let provider;
let signer;
let isConnected = false;

async function web3Login() {
    if (!isConnected) {
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                signer = provider.getSigner();
                const address = await signer.getAddress();
                const showAddress = "0x" + "..." + address.slice(-4);

                // Update the UI
                document.getElementById('show_address').innerText = showAddress;
                document.getElementById('connect_btn').innerText = 'Disconnect wallet';
                document.getElementById('address_input').value = address;

                // Send the address to the Django backend
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const response = await fetch('/dapp/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken,
                    },
                    body: `address=${address}`,
                });

                if (response.ok) {
                    console.log('User logged in successfully');
                } else {
                    console.error('Failed to log in user');
                }

                isConnected = true;
            } catch (error) {
                console.error('User denied account access or error occurred', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    } else {
        // Disconnect wallet
        document.getElementById('show_address').innerText = '';
        document.getElementById('connect_btn').innerText = 'Connect wallet';
        document.getElementById('address_input').value = '';
        isConnected = false;
    }
}

async function Vote() {
    const address = document.getElementById('voting_address_input').value;
    if (!address) {
        alert('Please connect your wallet first.');
        return;
    }

    const form = document.getElementById('voting_form');
    const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;
    const response = await fetch('/dapp/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,
        },
        body: new URLSearchParams(new FormData(form)),
    });

    if (response.ok) {
        console.log('Vote recorded successfully');
    } else {
        console.error('Failed to record vote');
    }
}



/*async function web3Login() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to connect your wallet.');
            return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const message = "Sign to authenticate: {{ csrf_token }}";
        const signature = await signer.signMessage(message);

        const response = await fetch('/dapp/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `address=${encodeURIComponent(address)}&signature=${encodeURIComponent(signature)}`,
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Wallet connected successfully!');
            // Update the button text

            document.querySelector('connect_btn').textContent = 'Disconnect wallet';
        } else {
            alert('Failed to connect wallet: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        alert('Error connecting wallet: ' + error.message);
    }
}
*/


/*function web3Login() {
    try {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getNetwork().then(function (result) {
                if (result.chainId !== 1) {
                    alert('Switch to Mainnet!');
                } else {
                    const accountAddress = accounts[0];
                    const signer = provider.getSigner();
                    signer.signMessage("Sign to auth {{ csrf_token }}").then((signature) => {
                        web3LoginBackend(accountAddress, signature);
                    });
                }
            });
        }).catch((error) => {
            console.error(error);
            alert('User denied account access or there was an error.');
        });
    } catch (error) {
        alert('Please install MetaMask for your browser.');
    }
}*/

/*function web3LoginBackend(accountAddress, signature) {
    const form = document.createElement('form');

    form.method = 'POST';

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = '{% csrf_token %}';
    form.appendChild(csrfInput);

    const accountInput = document.createElement('input');
    accountInput.type = 'hidden';
    accountInput.name = 'accountAddress';
    accountInput.value = accountAddress;
    form.appendChild(accountInput);

    const signatureInput = document.createElement('input');
    signatureInput.type = 'hidden';
    signatureInput.name = 'signature';
    signatureInput.value = signature;
    form.appendChild(signatureInput);

    document.body.appendChild(form);
    form.submit();
}*/







/*function web3Login() {
    try {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getNetwork().then(function (result) {
                if (result.chainId !== 1) {
                    alert('Switch to Mainnet!');
                } else {
                    const accountAddress = accounts[0]; 
                    const signer = provider.getSigner();
                    signer.signMessage("Sign to auth {{ csrf_token }}").then((signature) => {
                        web3LoginBackend(accountAddress, signature);
                    });
                }
            });
        }).catch((error) => {
            console.error(error);
            alert('User denied account access or there was an error.');
        });
    } catch (error) {
        alert('Please install MetaMask for your browser.');
    }
}

        // Dummy backend function for demonstration
function web3LoginBackend(accountAddress, signature) {
    console.log('Account:', accountAddress);
    console.log('Signature:', signature);
}

function web3LoginBackend(accountAddress, signature) {
    var form = document.createElement('form');
    form.action = '{% url "vote:dapp" %}';
    form.method = 'POST';
 
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'csrfmiddlewaretoken';
    input.value = '{{ csrf_token }}';
    form.appendChild(input);    

    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'accountAddress';
    input.value = accountAddress;
    form.appendChild(input);

    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'signature';
    input.value = signature;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
}
*/