import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Item } from 'src/app/models/item.models';
import { vatType } from 'src/app/models/vatType.models';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-or-add-item',
  templateUrl: './edit-or-add-item.component.html',
  styleUrls: ['./edit-or-add-item.component.scss']
})
export class EditOrAddItemComponent implements OnInit{

  fg!: FormGroup;
  ItemSelected! : Item;
  VatTypes: vatType[] = [];


  constructor(
    private readonly _router: Router,
    private readonly _fBuilder : FormBuilder,
    private readonly _toastr: NbToastrService, 
    private readonly _itemService: ItemsService
  ) { }


  ngOnInit(): void {
    this.ItemSelected = this._itemService.selectedItem;
    this._itemService.getAllVatTypes().subscribe({
      next: (data) => {
        this.VatTypes = data;
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des types de TVA : ', error);
      }
    });

    this.fg = new FormGroup({
      itemDiscription: new FormControl(this.ItemSelected?.itemDiscription ,[Validators.required,Validators.minLength(10),Validators.maxLength(150)]),
      itemNumber: new FormControl(this.ItemSelected?.itemNumber,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      supplierItemNumber: new FormControl(this.ItemSelected?.supplierItemNumber,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      itemBarcode: new FormControl(this.ItemSelected?.itemBarcode,[Validators.required,Validators.minLength(10),Validators.maxLength(50)]),
      itemPrice: new FormControl(this.ItemSelected?.itemPrice,[Validators.required,Validators.min(0.01),Validators.pattern('^[0-9]+(?:.[0-9]{1,6})?$')]),
      vatType : new FormControl(this.ItemSelected?.vatType.id ,[Validators.required])
    });

  }//end ngOnInit


  submit(): void 
  {
    this.fg.markAllAsTouched();
    if (this.fg.invalid) {
      this._toastr.warning('Veuillez vérifier les champs du formulaire', 'Erreur de validation');
      return;
    }

    const DTO = {
      id : this.ItemSelected.id,
      itemDescription : this.fg.get('itemDiscription')?.value,
      itemNumber : this.fg.get('itemNumber')?.value,
      supplierItemNumber : this.fg.get('supplierItemNumber')?.value,
      itemBarcode : this.fg.get('itemBarcode')?.value,
      itemPrice : this.fg.get('itemPrice')?.value,
      vatTypeId : this.fg.get('vatType')?.value
    }
    
    // this is an add operation
    if(!this.ItemSelected.id){
      this._itemService.addItem(DTO).subscribe({
        next: () => {
          this._toastr.show("l'article a bien été cree dans la DB", 'Succès');
          this._router.navigate(['items']);
        },
        error: (error) => {
          this._toastr.danger('Une erreur s\'est produite lors de l\'ajout de l\'item', 'Erreur');
          console.log(error);
        }
      });
      return;
    }


    // this is an update operation
    
    this._itemService.updateItem(DTO).subscribe({
      next: (resp) => {
        this._toastr.show(resp.message, 'Succès')
        console.log(resp.message);
        this._router.navigate(['items']);
      },
      error: (error) => {
        this._toastr.danger('Une erreur s\'est produite lors de la mise à jour de l\'item', 'Erreur');
        console.log(error);
      }
    });
    
  }

  Cancel () {
    this._router.navigate(['items']);
    this._itemService.remove();
  }

}
