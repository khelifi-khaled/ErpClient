import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { Item } from "../models/item.models";
import { environment } from "src/envirenments/envirenment.developement";


@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(
    private readonly _router : Router,
    private readonly _httpClient: HttpClient,
    ) {}

    
  private _selectedItem$: BehaviorSubject<Item|null> = new BehaviorSubject<Item|null>(null);
  
  get selectedItem$() {
    return this._selectedItem$.asObservable();
  }


  get selectedItem() : Item|null {
    return JSON.parse(localStorage.getItem("ItemSelected") ?? '' ) ;
  }

  deleteItem(item : Item) : Observable<any> {
    return this._httpClient.delete(environment.baseUri + 'items/' + item.id , { reportProgress: true });
  }

    getAllItems(): Observable<Item[]> {
        return this._httpClient.get<Item[]>(environment.baseUri + 'items', { reportProgress: true })
    }

    getItem(item : Item){
      this._selectedItem$.next(item);
      localStorage.setItem("ItemSelected", JSON.stringify(item));
      this._router.navigate(['consultItem']);
    }
  
    remove(){
      this._selectedItem$.next(null);
      localStorage.removeItem("ItemSelected");
    }
  

}

  