import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WalletConnect from "./WalletConnect/WalletConnect.js";
import Voting from "./Voting.js";
import Footer from "./Footer/Footer.js";


function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);


  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        setWalletAddress(accounts[0]);
        setShowWalletModal(false);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("Ethereum object doesn't exist!");
    }
  };


  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
  };


  const interBubbleRef = useRef(null);

  useEffect(() => {
    const interBubble = interBubbleRef.current;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = 'translate(' + Math.round(curX) + 'px, ' + Math.round(curY) + 'px)';
      requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', function(event) {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    return () => {
      window.removeEventListener('mousemove', () => {});
    };
  }, []);


  return (
    <div className="App">


      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive" ref={interBubbleRef}></div>
        </div>
      </div>



      <WalletConnect
        isConnected={isConnected}
        walletAddress={walletAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        showWalletModal={() => setShowWalletModal(true)}
        setShowWalletModal={setShowWalletModal}
        showWalletModalState={showWalletModal}
      />

      <Voting 
        isConnected={isConnected}
        showWalletModal={() => setShowWalletModal(true)}
      />

      <Footer />
      
    </div>
  );
}

export default App;
