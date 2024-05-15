import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.models';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-consult-invoice',
  templateUrl: './consult-invoice.component.html',
  styleUrls: ['./consult-invoice.component.scss'],
})
export class ConsultInvoiceComponent implements OnInit , OnDestroy{
  
  selectedInvoice : Invoice | null = null;
  tax : number = 0;

  get SelectedInvoice() : Invoice {
    return JSON.parse(localStorage.getItem("SelectedInvoice") ?? '' ) ;
  }


  constructor(
    private readonly _invoiceService : InvoiceService,
  ) {
  }
  ngOnDestroy(): void {
    this._invoiceService.removeInvoice();
  }
  
  ngOnInit(): void
  {
    this.selectedInvoice = this.SelectedInvoice;
    this.tax = this.selectedInvoice.totalVatAmount - this.selectedInvoice.totalAmountExcVat;
    
  }

  

}
