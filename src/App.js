import './App.css';
import React, { Component } from 'react';
import { ethers } from 'ethers';
import WalletApi from './api/WalletApi';
import ImageApi from './api/ImageApi'
import Moralis from "moralis";
import { MoralisProvider } from "react-moralis";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { serverUrl: "https://krfbcc2imrti.usemoralis.com:2053/server", appId: "9EpeuGiODhMDxg0FqRBlOssB8gH8iKJ9spvfQFsF" };
    this.createWallets = this.createWallets.bind(this);
    this.createUris = this.createUris.bind(this);
  }

  createUris = async (files) => {
    const images = [];
    for (let i = 0; i < files.length; i++) {
      images[i] = files[i];
    }
    await Promise.all(images.map(async (image) => {
      const file = new Moralis.File(image.name, image);
      await file.saveIPFS();
      const fileUrl = file.ipfs();
      const fileId = fileUrl.split("/")[4];
      const moralisGateWayIPFAddress = "https://gateway.moralisipfs.com/ipfs";
      const gatewayFileUrlAddress = `${moralisGateWayIPFAddress}/${fileId}`;
      ImageApi.load(gatewayFileUrlAddress, () => { console.log("Image uploaded") });
    }))
  }

  createWallets = () => {
    const n = 10;
    const wallets = [];
    const provider = new ethers.providers.EtherscanProvider("rinkeby");
    for (let i = 0; i < n; i++) {
      const emptyWallet = ethers.Wallet.createRandom();
      const connectedWallet = emptyWallet.connect(provider);
      WalletApi.load(connectedWallet.address, connectedWallet.publicKey, connectedWallet.privateKey, connectedWallet.mnemonic.phrase, () => { console.log("Wallet uploaded") });
      wallets.push(connectedWallet);
    }
    console.log(wallets);
  }

  render() {
    return (
      <MoralisProvider appId={this.state.appId} serverUrl={this.state.serverUrl}>
        <div className="App">
          <button onClick={this.createWallets}>Create Wallets</button>
          <form>
            <div>
              <label htmlFor='images'>Set Images</label>
              <input type='file'
                multiple="multiple"
                onChange={(e) => { this.createUris(e.target.files) }}
              />
            </div>
          </form>
        </div>
      </MoralisProvider>
    );
  }
}

export default App;
