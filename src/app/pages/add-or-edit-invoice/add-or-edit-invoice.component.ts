import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Customer } from 'src/app/models/customer.models';
import { Invoice } from 'src/app/models/invoice.models';
import { InvoiceItem } from 'src/app/models/invoiceItem.models';
import { Item } from 'src/app/models/item.models';
import { CustomersService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ItemsService } from 'src/app/services/items.service';

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
  allItems: Item[] = [];
  filteredItems: Item[] = [];

constructor(
  private readonly _invoiceService : InvoiceService,
  private readonly _toaster: NbToastrService,
  private readonly _router : Router,
  private readonly _customerService : CustomersService,
  private readonly _itemService : ItemsService
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

    this._itemService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.allItems = items;
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
    this._toaster.info('You can delete item');
  }

onKeyDownCustomer(event: any) {  
  this.filteredCustomers = 
  this.allCustomers
  .filter(
    c => 
      c.customerName.toLowerCase().includes(event.textContent.toLowerCase()) || 
      c.customerVatNumber.toLowerCase().includes(event.textContent.toLowerCase()) || 
      c.customerNumber.toString().includes(event.textContent.toLowerCase())
    ); 
}

onKeyDownItem(event: any) {  
  this.filteredItems = 
  this.allItems
  .filter(
    i => 
      i.itemDiscription.toLowerCase().includes(event.textContent.toLowerCase()) ||
      i.itemNumber.toLowerCase().includes(event.textContent.toLowerCase()) ||
      i.supplierItemNumber.toLowerCase().includes(event.textContent.toLowerCase())
    ); 
    console.log(this.filteredItems);
    
}

addItemToInvoice(item: Item) : void {
  const invoiceItem : InvoiceItem = {
    id: 0,
    item : item,
    quantity : 1,
    price : item.itemPrice,
    purchcasePrice : item.itemPrice + (item.itemPrice * Number.parseInt(item.vatType.vatValue.vatValue)/100),
    discount : 0
  };

  const itemToAdd = this.selectedInvoice.invoiceItems.find(i => i.item.id === item.id);
  if(itemToAdd){
    this.addQuantity(itemToAdd);
    this._invoiceService.setInvoice(this.selectedInvoice);
    this.filteredItems = []
    return;
  }
  this.selectedInvoice.invoiceItems.push(invoiceItem);
  this.calculTotalAmount();
  this._invoiceService.setInvoice(this.selectedInvoice);
  this.filteredItems = []
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

calculTotalAmount () : void {
  this.selectedInvoice.totalAmountExcVat = this.selectedInvoice.invoiceItems.reduce((acc, item) => acc + item.price, 0);
  this.selectedInvoice.totalVatAmount = this.selectedInvoice.invoiceItems.reduce((acc, item) => acc + item.purchcasePrice, 0);
  this.tax = this.selectedInvoice.totalVatAmount - this.selectedInvoice.totalAmountExcVat;
  this._invoiceService.setInvoice(this.selectedInvoice);
}
}
