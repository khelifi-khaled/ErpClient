import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/models/item.models';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit  {

  constructor(
    private readonly _itemService : ItemsService
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
   this._itemService.getItem(item);
  }

}
