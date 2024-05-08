import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Customer } from "../models/customer.models";
import { environment } from "src/envirenments/envirenment.developement";
import { NbLayoutHeaderComponent } from "@nebular/theme";


@Injectable({
    providedIn: 'root',
  })


  export class CustomersService{
    constructor(
        private readonly _router : Router,
        private readonly _httpClient: HttpClient,
    ){

    }

    private _selectedCustomer$: BehaviorSubject<Customer|null> = new BehaviorSubject<Customer|null>(null);
  
    get selectedCustomer$() {
      return this._selectedCustomer$.asObservable();
    }
  
  
    get selectedCustomer() : Customer {
      return JSON.parse(localStorage.getItem("CustomerSelected") ?? '' ) ;
    }
  
  
    getAllCustemers(): Observable<Customer[]> {
        return this._httpClient.get<Customer[]>(environment.baseUri + 'customers', { reportProgress: true })
    }


    setCustomer(customer : Customer){
        this._selectedCustomer$.next(customer);
        localStorage.setItem("CustomerSelected", JSON.stringify(customer));
      }
    
      remove(){
        this._selectedCustomer$.next(null);
        localStorage.removeItem("CustomerSelected");
      }

      deleteCustomer(id : string ) : Observable<any>{
        return this._httpClient.delete(environment.baseUri + 'customers/' + id, { reportProgress: true });
      }

      addCustomer(customer : any) : Observable<any>{
        return this._httpClient.post<any>(environment.baseUri + 'customer/create', customer, { reportProgress: true });
      }

      updateCustomer(customer : any) : Observable<any>{
        return this._httpClient.put<Customer>(environment.baseUri + 'customers', customer, { reportProgress: true });
      }

      getAllPayementTerms(): Observable<any>{
        return this._httpClient.get(environment.baseUri + 'customer/payment-terms', { reportProgress: true });
      }

      getAllCategories(): Observable<any>{
        return this._httpClient.get(environment.baseUri + 'customer/categories', { reportProgress: true });
      }


  }
