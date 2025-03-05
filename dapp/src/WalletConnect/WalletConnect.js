import React, { useState } from 'react';


function WalletConnect(){
	const [userAccount, setUserAccount] = useState("");
	const [userAccountShort, setUserAccountShort] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const onConnect = async () => {
		if (userAccount) {
		setUserAccount("");
		setUserAccountShort("");
    	} else {
			if (window.ethereum) {
				try {
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const fullAccount = accounts[0];
					setUserAccount(fullAccount);
					setUserAccountShort("0x" + "..." + fullAccount.slice(-4)); 
					hideModal();
				} catch (error) {
					console.error("Error connecting:", error);
				}
			} else {
				alert("Please install MetaMask!");
			}
		}
  	};


  	const showModal = () => {
		setIsVisible(true);
	};
	const hideModal = () => {
		setIsVisible(false);
	};

return (
    	<div id='connect_section' className='container'>
    		<div className='d-flex flex-row-reverse'>

    			<div>
	               <button id='show' 
	                  className={userAccount ? 'hide button_light' : 'block button_light we_300'  }
	                  onClick={showModal}
	               >
	               {userAccount ? 'Disconnect' : 'Connect wallet'}
	               </button>

	               <button id='disconnect' 
	                  className={ userAccount ? 'block button_light' : 'hide button_light we_300' }  
	                  onClick={onConnect}
	               >
	               {userAccount ? 'Disconnect' : 'Connect wallet'}
	               </button>
	            </div>

	            <div className='pt-4 pe-3 text_9 gray_dark' id='address'>
					{userAccount ? (
						<div className=''>
		                	<span сlassName=''>{userAccountShort}</span>
	                	</div>
					) : (
	                	<span сlassName='ms-4'>Wallet not connect</span>
	               )}
	           	</div>
	            
	            


        	</div>



        	<div className={`${isVisible ? 'block' : 'hidden'} modal_full`} id="w">
			
	            <div className='p-4 modal_container'>
	               <span id='hide' className='close' onClick={hideModal}>&times;</span>
	               <center><h2 className='we_300'>Connect Your Wallet</h2></center>

		            <div className='w_container pt-5'> 
		               <div id='metamask' className='card' onClick={onConnect}>
		                  <img src="/svg_icons/wallets/metamask.svg" alt="Wallet Icon" className=" "  />
		               </div>
		               <div className='card'>
							<img src="/svg_icons/wallets/w_connect.svg" alt="Wallet Icon" className="op_50"  />
						</div>
						<div className='card'>
							<img src="/svg_icons/wallets/trust.svg" alt="Wallet Icon" className="op_50"  />
						</div>

						<div className='card'>
							<img src="/svg_icons/wallets/okx.svg" alt="Wallet Icon" className="op_50" />
						</div>
						<div className='card'>
							<img src="/svg_icons/wallets/imtoken.svg" alt="Wallet Icon" className="op_50"  />
						</div>
						<div className='card'>
							<img src="/svg_icons/wallets/rainbow.svg" alt="Wallet Icon" className="op_50"  />
						</div>
		           	</div>
	         	</div>
	         	
      	</div>

		</div>
	);
}

export default WalletConnect;