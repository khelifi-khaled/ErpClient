import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/envirenments/envirenment.developement';
import { Invoice } from '../models/invoice.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router : Router
  ) { }

  private _selectedInvoice$: BehaviorSubject<Invoice|null> = new BehaviorSubject<Invoice|null>(null);
  
  get selectedInvoice$() {
    return this._selectedInvoice$.asObservable();
  }

  get selectedInvoice() : Invoice {
    return localStorage.getItem("SelectedInvoice") ? JSON.parse(localStorage.getItem("SelectedInvoice")!) : null;
  }

  setInvoice(invoice : Invoice){
    this._selectedInvoice$.next(invoice);
    localStorage.setItem("SelectedInvoice", JSON.stringify(invoice));
  }

  removeInvoice(){
    this._selectedInvoice$.next(null);
    localStorage.removeItem("SelectedInvoice");
  }



  postInvoice(invoice : any) : Observable<any> {
    return this._httpClient.post<any>(environment.baseUri + 'Invoice/Create', invoice, { reportProgress: true });
  }

  updateInvoice(invoice : any) : Observable<any> {
    return this._httpClient.put(environment.baseUri + 'Invoices', invoice, { reportProgress: true });
  }

  getAllInvoices() : Observable<any> {
    return this._httpClient.get(environment.baseUri + 'Invoices', { reportProgress: true });
  }
}
