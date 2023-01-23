import { Component } from '@angular/core';
import { NgxWeb3ContractService } from 'ngx-web3-contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-web3';
  constructor(private cs:NgxWeb3ContractService){
    cs.connectToMetaMask()
  }
}
