import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Customer } from 'src/app/models/customer.models';
import { Invoice } from 'src/app/models/invoice.models';
import { InvoiceItem } from 'src/app/models/invoiceItem.models';
import { CustomersService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-add-or-edit-invoice',
  templateUrl: './add-or-edit-invoice.component.html',
  styleUrls: ['./add-or-edit-invoice.component.scss']
})
export class AddOrEditInvoiceComponent implements OnInit , OnDestroy{

  fg!: FormGroup;
  allCustomers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchText = '';
  selectedInvoice! : Invoice;
  tax : number = 0;

constructor(
  private readonly _invoiceService : InvoiceService,
  private readonly _toaster: NbToastrService,
  private readonly _router : Router,
  private readonly _customerService : CustomersService
) {
}
  ngOnDestroy(): void {
    this._invoiceService.removeInvoice();
   
  }
  ngOnInit(): void {

    this.selectedInvoice = this._invoiceService.selectedInvoice;
    this.tax = this.selectedInvoice.totalVatAmount - this.selectedInvoice.totalAmountExcVat;
    this._customerService.getAllCustemers().subscribe({
      next: (customers: Customer[]) => {
        this.allCustomers = customers;
      },
      error: (error) => {
        this._toaster.danger(error.message);
      }
    });
    this.fg = new FormGroup({
      itemDiscription : new FormControl(this.selectedInvoice.invoiceItems[0].item.itemDiscription),
    });
  }



  submit() : void {
    console.log('submit');
  }

  addQuantity(invoiceItem : InvoiceItem) : void {
    invoiceItem.quantity++;
    invoiceItem.price = invoiceItem.item.itemPrice * invoiceItem.quantity;
    invoiceItem.purchcasePrice = 
    invoiceItem.price + (invoiceItem.price * Number.parseInt(invoiceItem.item.vatType.vatValue.vatValue)/100);
    this.calculTotalAmount();
  }

  removeQuantity(invoiceItem : InvoiceItem) : void {
    if(invoiceItem.quantity > 1 ) {
      invoiceItem.quantity--;
      invoiceItem.price = invoiceItem.item.itemPrice * invoiceItem.quantity;
      invoiceItem.purchcasePrice =
      invoiceItem.price + (invoiceItem.price * Number.parseInt(invoiceItem.item.vatType.vatValue.vatValue)/100);
      this.calculTotalAmount();
      return;
    }
    this._toaster.warning('You can not remove all items');
  }

onKeyDown(event: any) {  
  this.filteredCustomers = 
  this.allCustomers
  .filter(
    c => 
      c.customerName.toLowerCase().includes(event.textContent.toLowerCase()) || 
      c.customerVatNumber.toLowerCase().includes(event.textContent.toLowerCase()) || 
      c.customerNumber.toString().includes(event.textContent.toLowerCase())
    ); 
}


setCustomerToInvoice(customer: Customer) : void {
  this.selectedInvoice.customer = customer;
  this.filteredCustomers = [];
  this._invoiceService.setInvoice(this.selectedInvoice);
}



removeInvoiceItem (id : any) : void {
  if(this.selectedInvoice.invoiceItems.length > 1){
    this.selectedInvoice.invoiceItems = this.selectedInvoice.invoiceItems.filter(i => i.id !== id);
    this.calculTotalAmount();
    return;
  }
  this._toaster.warning('You can not remove all items');
}


AddInvoiceItem () : void {
console.log('AddInvoiceItem');

}

calculTotalAmount () : void {
  this.selectedInvoice.totalAmountExcVat = this.selectedInvoice.invoiceItems.reduce((acc, item) => acc + item.price, 0);
  this.selectedInvoice.totalVatAmount = this.selectedInvoice.invoiceItems.reduce((acc, item) => acc + item.purchcasePrice, 0);
  this.tax = this.selectedInvoice.totalVatAmount - this.selectedInvoice.totalAmountExcVat;
  this._invoiceService.setInvoice(this.selectedInvoice);
}

}
