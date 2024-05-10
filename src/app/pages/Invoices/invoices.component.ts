import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Invoice } from 'src/app/models/invoice.models';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit{


  constructor(
    private readonly _invoiceService : InvoiceService,
    private readonly _toaster: NbToastrService,
  ) { }

  filteredInvoices: Invoice[]  = [];
  allInvoices : Invoice[] = [];
  searchText: string = '';
 filters = {
    to: '',
    from: '',
  };


  ngOnInit(): void {
    this._invoiceService.getAllInvoices().subscribe({
      next: (invoices: Invoice[]) => { // Update the type of the 'next' parameter
        this.allInvoices = invoices;
        this.filteredInvoices = this.allInvoices;
        console.log(this.allInvoices);
        
      },
      error: (error) => {
        this._toaster.danger(error.message);
      }
    });
    
  }


  consultInvoice (invoice : Invoice) : void {
    // Add the implementation here
    console.log("consultInvoice");
  }

  deleteInvoice(invoice : Invoice) : void {
    // Add the implementation here
    console.log("deleteInvoice");
  }

  editInvoice(invoice : Invoice) : void {
    // Add the implementation here
    console.log("editeIvoice");
  }

  onSearchTextChange(changes: SimpleChanges): void {
   this.filterInvoices();

  }

  filterInvoices(): void {
    const datepipe: DatePipe = new DatePipe('en-US')
    const searchTerm = this.searchText.toLowerCase();
    this.filteredInvoices = this.allInvoices.filter(
      invoice =>
        invoice.invoiceNumber.toString().includes(searchTerm) ||
        invoice.customer.customerName.toLowerCase().includes(searchTerm) || 
        invoice.customer.customerNumber.toString().includes(searchTerm) || 
        datepipe.transform(invoice.invoiceDate, 'dd-MM-YYYY')?.includes(searchTerm) ||
        datepipe.transform(invoice.invoiceDate, 'dd/MM/YYYY')?.includes(searchTerm) 
       
    );
  }

  addInvoice(): void {
    // Add the implementation here
    console.log("addInvoice");
  }
  
}
