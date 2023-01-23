import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWeb3ContractComponent } from './ngx-web3-contract.component';

describe('NgxWeb3ContractComponent', () => {
  let component: NgxWeb3ContractComponent;
  let fixture: ComponentFixture<NgxWeb3ContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxWeb3ContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxWeb3ContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
