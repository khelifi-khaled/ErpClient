import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/distroyed.conmponent';
import { Customer } from 'src/app/models/customer.models';
import { CustomersService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-consultCustomer',
  templateUrl: './consultCustomer.component.html',
  styleUrls: ['./consultCustomer.component.scss']
})
export class ConsultCustomerComponent extends DestroyedComponent implements OnInit, OnDestroy  {

  constructor(
    private readonly _customerService : CustomersService
  ){
    super();
  }

  private _customerSelected! : Customer | null;
 
  get CustomerSelected() : Customer {
    return JSON.parse(localStorage.getItem("CustomerSelected") ?? "null")
  }


  ngOnInit(): void {
    this._customerService.selectedCustomer$.pipe(takeUntil(this.destroyed$)).subscribe((data )=>{
      this._customerSelected = data; 
    });

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._customerService.remove();
  }
  

}
