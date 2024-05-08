import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PayementTerm } from 'src/app/models/PayementTerm.models';
import { Category } from 'src/app/models/category.models';
import { Customer } from 'src/app/models/customer.models';
import { CustomersService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-or-add-customer',
  templateUrl: './edit-or-add-customer.component.html',
  styleUrls: ['./edit-or-add-customer.component.scss']
})
export class EditOrAddCustomerComponent implements OnInit, OnDestroy {
  
  

  constructor(
    private readonly _customerService : CustomersService,
    private readonly _router: Router,
    private readonly _toastr: NbToastrService, 
  ) {}


 
  
   customerSelected ! : Customer;
   fg!: FormGroup;
   customerPayementTerms : PayementTerm[] = []; 
   customerCategories : Category[] = [];
  
  ngOnInit(): void {
    this.customerSelected = this._customerService.selectedCustomer;

    this._customerService.getAllPayementTerms().subscribe({
      next : (data) => {
        this.customerPayementTerms = data;
      },
      error : (error) => {
        console.error(error.message, error);
      }
    });
    this._customerService.getAllCategories().subscribe({
      next : (data) => {
        this.customerCategories = data;
      },
      error : (error) => {
        console.error(error.message, error);
      }
    });


    this.fg = new FormGroup({
      customerName: 
      new FormControl(
        this.customerSelected.customerName ,
        [Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      customerPhoneNumber: 
      new FormControl(
        this.customerSelected.customerPhoneNumber,
        [Validators.required,Validators.minLength(9),Validators.maxLength(50)]),
      customerFaxNumber: 
      new FormControl(
        this.customerSelected.customerFaxNumber,
        [Validators.required,Validators.minLength(9),Validators.maxLength(50)]),
      customerEmail: 
      new FormControl(
        this.customerSelected.customerEmail,
        [Validators.required,Validators.minLength(10),Validators.maxLength(50),Validators.email]),
      customerVatNumber:
       new FormControl(
        this.customerSelected.customerVatNumber,
        [Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      registeredVat : 
      new FormControl(
        this.customerSelected.registeredVat,[]),
      customerCategory : 
      new FormControl(
        this.customerSelected.customerCategory.id,
        [Validators.required]),
      customerPayementTerm : 
      new FormControl(
        this.customerSelected.customerPayementTerm.id,
        [Validators.required]),
        customerNumber : 
        new FormControl(this.customerSelected.customerNumber)
    });
  }

  ngOnDestroy(): void {
    this._customerService.remove();
  }



  submit(): void {
   this.fg.markAllAsTouched();
    if (this.fg.invalid) {
      this._toastr.warning('Veuillez vérifier les champs du formulaire', 'Erreur de validation');
      return;
    }



    const DTO = {
      id : this.customerSelected.id ?? '',
      customerName : this.fg.get('customerName')?.value,
      phoneNumber : this.fg.get('customerPhoneNumber')?.value,
      faxNumber : this.fg.get('customerFaxNumber')?.value,
      mail : this.fg.get('customerEmail')?.value,
      vatNumber : this.fg.get('customerVatNumber')?.value,
      registeredVat : this.fg.get('registeredVat')?.value,
      cathegoryId : this.fg.get('customerCategory')?.value,
      paymentTermId : this.fg.get('customerPayementTerm')?.value,
    }

    

    if(! this.customerSelected.id){
      console.log(DTO);
      
      this._customerService.addCustomer(DTO).subscribe({
        next: (data) => {
          this._toastr.success('Le client ' + data.name +" a bien été ajouté dans la Db", 'Opération réussie');
          this._router.navigate(['customers']);
        },
        error: (error) => {
          this._toastr.danger(error, 'Opération échouée');
        }
      });
      return;
    }
    console.log(DTO);
    this._customerService.updateCustomer(DTO).subscribe({
      next: (data) => {
        console.log(data);
        
        this._toastr.success(data.message, 'Opération réussie');
        this._router.navigate(['customers']);
      },
      error: (error) => {
        console.error(error, error);
        this._toastr.danger(error.message, 'Opération échouée');
      }
    });
    
  }

  cancel(): void {
    this._customerService.remove();
    this._router.navigate(['customers']);
  }

}
