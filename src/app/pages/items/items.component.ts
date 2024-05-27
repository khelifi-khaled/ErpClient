import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Item } from 'src/app/models/item.models';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit  {

  constructor(
    private readonly _itemService : ItemsService,
    private readonly _toaster: NbToastrService,
    private readonly _router: Router
  ){}
  
  
  filteredItems: Item[] = [];
  allItems : Item[] = [];
  searchText: string = '';



  ngOnInit(): void {
    this._itemService.getAllItems().subscribe({
      next: (response) => {
        this.allItems = response.value;
        this.filteredItems = this.allItems;
      }
    });
    
  }

  onSearchTextChange(changes: SimpleChanges): void {
    this.filterItems();
  }

  filterItems(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredItems = this.allItems.filter(
      item =>
        item.itemDiscription.toLowerCase().includes(searchTerm) ||
        item.supplierItemNumber.toLowerCase().includes(searchTerm) ||
        item.itemNumber.toLowerCase().includes(searchTerm)
    );
  }


  consulterItem(item : Item) : void {
   this._itemService.setItem(item);
  }

  supprimerItem(item : Item) : void {
    this._itemService.deleteItem(item).subscribe({
      next: () => {
        this.allItems = this.allItems.filter(i => i.id !== item.id);
        this.filteredItems = this.allItems;
        this._toaster.success('L\'item a été supprimé avec succès', 'Suppression');
      }
    });
  }



  EditItem(item : Item) : void {
    this._itemService.setItem(item);
    this._router.navigate(['/addOreditItem']);
  }

  AddItem() : void {
    const DTO = {
      id : '',
      itemDescription : '',
      itemNumber : '',
      supplierItemNumber : '',
      itemBarcode : '',
      itemPrice :'',
      vatType : {
        id : '',
        vatType : '',
        vatValue : {
          id : '',
          vatValue : ''
        }
      }
    }

    this._itemService.setItem(DTO as unknown as  Item);
    this._router.navigate(['/addOreditItem']);
  }
}
