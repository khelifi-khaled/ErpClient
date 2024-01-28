import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/distroyed.conmponent';
import { Item } from 'src/app/models/item.models';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-consultItem',
  templateUrl: './consultItem.component.html',
  styleUrls: ['./consultItem.component.scss']
})
export class ConsultItemComponent extends DestroyedComponent implements OnInit, OnDestroy  {

  constructor(
    private readonly _itemService : ItemsService
  ){
    super();
  }

  private _itemSelected! : Item | null;
 
  get ItemSelected() : Item {
    return JSON.parse(localStorage.getItem("ItemSelected") ?? "null")
  }


  ngOnInit(): void {
    this._itemService.selectedItem$.pipe(takeUntil(this.destroyed$)).subscribe((data )=>{
      this._itemSelected = data;
    });

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._itemService.remove();
  }
  

}
