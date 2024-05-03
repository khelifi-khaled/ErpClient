import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Customer } from "../models/customer.models";
import { environment } from "src/envirenments/envirenment.developement";


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
  
  
    get selectedCustomer() : Customer|null {
      return JSON.parse(localStorage.getItem("CustomerSelected") ?? '' ) ;
    }
  
  
    getAllCustemers(): Observable<Customer[]> {
        return this._httpClient.get<Customer[]>(environment.baseUri + 'customers', { reportProgress: true })
    }


    getCustomer(customer : Customer){
        this._selectedCustomer$.next(customer);
        localStorage.setItem("CustomerSelected", JSON.stringify(customer));
        this._router.navigate(['consultCustomer']);
      }
    
      remove(){
        this._selectedCustomer$.next(null);
        localStorage.removeItem("CustomerSelected");
      }


  }
