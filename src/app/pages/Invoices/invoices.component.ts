import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {  NbToastrService } from '@nebular/theme';
import { Invoice } from 'src/app/models/invoice.models';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit{

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly _invoiceService : InvoiceService,
    private readonly _toaster: NbToastrService,
    private readonly _router : Router
  ) 
  { }

  filteredInvoices: Invoice[]  = [];
  allInvoices : Invoice[] = [];
  displayedColumns: string[] = ['Number', 'Date', 'DueDate', 'CustomerName', 'CustomerNumber','Buttons'];
  dataSource = new MatTableDataSource<Invoice>();
  searchText = '';

  ngOnInit(): void {
    this._invoiceService.getAllInvoices().subscribe({
      next: (invoices: Invoice[]) => { 
        this.allInvoices = invoices;
        this.filteredInvoices = this.allInvoices;
        this.dataSource.data = invoices;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this._toaster.danger(error.message);
      }
    });
  }
  
  
  onSortChange(event: Sort) {

    const data = this.dataSource.data.slice(); // Copie des données actuelles
    if (!event.active || event.direction === '') {
      // Si aucune colonne n'est triée, afficher les données dans l'ordre d'origine
      this.dataSource.data = data;
      return;
    }

    // Tri des données selon la colonne et la direction du tri
    const isAsc = event.direction === 'asc';
    this.dataSource.data = data.sort((a, b) => {
      switch (event.active) {
        case 'Number': return this.compare(a.invoiceNumber, b.invoiceNumber, isAsc);
        case 'Date': return this.compare(a.invoiceDate, b.invoiceDate, isAsc);
        case 'DueDate': return this.compare(a.invoiceDueDate, b.invoiceDueDate, isAsc);
        case 'CustomerName': return this.compare(a.customer.customerName, b.customer.customerName, isAsc);
        case 'CustomerNumber': return this.compare(a.customer.customerNumber, b.customer.customerNumber, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  consultInvoice (invoice : Invoice) : void {
    this._invoiceService.setInvoice(invoice);
    this._router.navigate(['consultInvoice']);
  }

  editInvoice(invoice : Invoice) : void {
    this._invoiceService.setInvoice(invoice);
    this._router.navigate(['addOrEditInvoice']);
  }

  onSearchTextChange(changes: SimpleChanges): void {
   this.filterInvoices();

  }

  filterInvoices(): void {
    const datepipe: DatePipe = new DatePipe('en-US');
    const searchTerm = this.searchText.toLowerCase();
    this.dataSource.data = this.allInvoices.filter(
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
