# NgxEthersContract

## Install

```bash
npm install npm i ngx-web3-contract--save
```

## Setup



```typescript
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxWeb3ContractModule } from "ngx-web3-contract";

@NgModule({
  imports: [CommonModule, NgxWeb3ContractModule],
  bootstrap: [App],
  declarations: [App],
})
class MainModule {}
```

## Use

```typescript
import { NgxWeb3ContractService } from 'ngxEthersContract';


@Component({...})
export class YourComponent {
  constructor(private ngxEthService: NgxWeb3ContractService) {
    this.connect()
  }
// for metamask
 async connect() {
    const address = await this.ngxEthService.connectToMetaMask();
    console.log(address);
  }
  //for wallet connect
 async walletConnect() {
  const providerOption = {
      rpc: {
    97: "rpc-url-here";
  };
  network: 'binance';
  chainId: 97;
  }
    const address = await this.ngxEthService.connectToWalletConnect(providerOption);
    console.log(address);
  }

}

// call smart contract

callFuntion(){
  const contractAddress = "0xjasdjsda88968678q32e9897eqwe21321"
  const contractABI = [{}]
  let functionName = 'getNftDetails'
  const params = [params1,params2,params3]
    const address = await this.ngxEthService.callSmartContractFunction(contractAddress,contractABI,functionName,params);
    console.log(address);

}

```

if you pass chainId as parameter it will automatically switch network with respective chain if network is exist.

## call smart contaract
