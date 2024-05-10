import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/envirenments/envirenment.developement';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }





  getAllInvoices() : Observable<any> {
    return this._httpClient.get(environment.baseUri + 'Invoices', { reportProgress: true });
  }
}
