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
      next: (items: Item[]) => {
        this.allItems = items;
        this.filteredItems = this.allItems;
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des items : ', error);
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
      next: (response) => {
        this.allItems = this.allItems.filter(i => i.id !== item.id);
        this.filteredItems = this.allItems;
        this._toaster.success(response.message);
        console.log(response);
        
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'item : ', error);
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
