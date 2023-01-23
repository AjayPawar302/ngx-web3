import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

export interface ProviderOption {
  rpc: {
    [chainId: number]: string;
  };
  network: string;
  chainId: number;
}

function _window(): any {
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class NgxWeb3ContractService {
  private provider!: ethers.providers.Web3Provider;

  get nativeWindow(): any {
    return _window();
  }

  constructor() {}

  public async connectToMetaMask(chainId?: number) {
    if (this.nativeWindow.ethereum == undefined)
      return console.log('please install metamask');
    try {
      localStorage.setItem('wallet', '1');
      await this.nativeWindow.ethereum.enable();
      this.provider = new ethers.providers.Web3Provider(
        this.nativeWindow.ethereum
      );
      const accounts = await this.provider.listAccounts();
      const network = await this.provider.getNetwork()

      if(network.chainId!=chainId){
          this.switchNetwork(chainId)
      }

      this.nativeWindow.ethereum.on('accountsChanged', (accounts: string[]) => {
        location.reload();
        this.connectToMetaMask(chainId);
      });

      this.nativeWindow.ethereum.on('networkChanged', (reason: string) => {
        if (reason != chainId?.toString()) {
          this.switchNetwork(chainId);
        }
      });
      return accounts[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async connectToWalletConnect(
    providerOption: ProviderOption,
    chainId?: number
  ) {
    localStorage.setItem('wallet', '1');
    const provider = new WalletConnectProvider(providerOption);
    this.provider = new ethers.providers.Web3Provider(provider);
    const accounts = await provider.enable();
    provider['on']('disconnect', (error: any) => {
      // handle the disconnection
      location.reload();
      this.connectToWalletConnect(providerOption, chainId);
    });
    provider['on']('networkChanged', (networkId: any) => {
      // handle the network change
      if (networkId != chainId?.toString()) {
        this.switchNetwork(chainId);
      }
    });
    return accounts[0];
  }

  async switchNetwork(chainId?: number) {
    const switchNetwork = await new Promise(async (resolve, reject) => {
      const wallet = localStorage.getItem('wallet');
      if (wallet === '1') {
        try {
          await this.nativeWindow.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId?.toString(16)}` }], // chainId must be in hexadecimal numbers
          });
          resolve('switched Network successfully');
        } catch (error: any) {
          console.log('Switch Wallet==>', error);
        }
      }
    });

    return switchNetwork;
  }

  async callSmartContractFunction(
    contractAddress: string,
    contractABI: [],
    functionName: string,
    params: []
  ) {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.provider.getSigner()
    );
    const result = await contract.functions[functionName](...params);
    return result;
  }

 async signMessage(message:string){
    const signer = this.provider.getSigner()
    let signature = ''
    try {
      signature = await signer.signMessage(message);
      return {signature:signature,status:true};
    } catch (e) {
      return {signature:e,status:false};
    }
  }
}


