import React from "react";

function WalletConnect({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  showWalletModal,
  setShowWalletModal,
  showWalletModalState,
}) {
  const userAccountShort = isConnected
    ? "0x..." + walletAddress.slice(-4)
    : "";

  return (
    <div id="connect_section" className="container">
      <div className="d-flex flex-row-reverse">
        <div>
          <button
            id="show"
            className={isConnected ? "hide button_dark" : "block button_dark we_300"}
            onClick={showWalletModal}
          >
            {isConnected ? "Disconnect" : "Connect wallet"}
          </button>

          <button
            id="disconnect"
            className={isConnected ? "block button_dark" : "hide button_dark we_300"}
            onClick={onDisconnect}
          >
            {isConnected ? "Disconnect" : "Connect wallet"}
          </button>
        </div>

        <div className="pt-4 pe-3 text_9 gray_dark" id="address">
          {isConnected ? (
            <div>
              <span>{userAccountShort}</span>
            </div>
          ) : (
            <span className="ms-4">Wallet not connected</span>
          )}
        </div>
      </div>

      <div className={`${showWalletModalState ? "block" : "hidden"} modal_full`} id="w">
        <div className="p-4 modal_container">
          <span id="hide" className="close" onClick={() => setShowWalletModal(false)}>
            &times;
          </span>
          <center>
            <h2 className="we_300">Connect Your Wallet</h2>
          </center>

          <div className="w_container pt-5">
            <div id="metamask" className="card" onClick={onConnect}>
              <img src="/svg_icons/wallets/metamask.svg" alt="Wallet Icon" />
            </div>
            <div className="card">
              <img
                src="/svg_icons/wallets/w_connect.svg"
                alt="Wallet Icon"
                className="op_50"
              />
            </div>
            <div className="card">
              <img
                src="/svg_icons/wallets/trust.svg"
                alt="Wallet Icon"
                className="op_50"
              />
            </div>
            <div className="card">
              <img src="/svg_icons/wallets/okx.svg" alt="Wallet Icon" className="op_50" />
            </div>
            <div className="card">
              <img
                src="/svg_icons/wallets/imtoken.svg"
                alt="Wallet Icon"
                className="op_50"
              />
            </div>
            <div className="card">
              <img
                src="/svg_icons/wallets/rainbow.svg"
                alt="Wallet Icon"
                className="op_50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletConnect;