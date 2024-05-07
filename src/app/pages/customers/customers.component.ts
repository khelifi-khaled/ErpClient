import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Customer } from 'src/app/models/customer.models';
import { CustomersService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
constructor(
    private readonly _customerService : CustomersService,
    private readonly _toaster : NbToastrService,
    private readonly _router: Router
  ){

}



filteredCustomers: Customer[] = [];
allCustomers : Customer[] = [];
searchText: string = '';


  ngOnInit(): void {
    this._customerService.getAllCustemers().subscribe({
      next: (customers: Customer[]) => {
        this.allCustomers = customers;
        this.filteredCustomers = this.allCustomers;
        
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des customers : ', error);
      }
    })
  }


  onSearchTextChange(changes: SimpleChanges): void {
    this.filterCustomers();
  }

  filterCustomers(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredCustomers = this.allCustomers.filter(
      customer =>
      customer.customerName.toLowerCase().includes(searchTerm) ||
      customer.customerName.toLowerCase().includes(searchTerm) ||
      customer.customerVatNumber.toLowerCase().includes(searchTerm)
    );
  }


  consultCustomer(customer : Customer) : void {
   this._customerService.setCustomer(customer)
   this._router.navigate(['consultCustomer']);
  }
  AddCustomer() : void {
    const customer = {
      id : '',
      customerCategory : {
        id : '',
        categor : ''
      },
      customerPayementTerm : {
        id : '',
        payementTerm : '',
        payementTermCode : ''
      },
      customerNumber : 0,
      customerName : '',
      customerPhoneNumber : '',
      customerFaxNumber : '',
      customerEmail : '',
      customerVatNumber : '',
      registeredVat : false
      
    }
    this._customerService.setCustomer(customer as unknown as Customer);
    this._router.navigate(['addOreditCustomer']);
  }

  EditCustomer(customer : Customer) : void {
    this._customerService.setCustomer(customer);

    this._router.navigate(['addOreditCustomer']);
  }

  DeleteCustomer(customer : Customer) : void {
    this._customerService.deleteCustomer(customer.id).subscribe({
      next: (resp) => {
        this.allCustomers = this.allCustomers.filter(c => c.id !== customer.id);
        this.filteredCustomers = this.allCustomers;
        this._toaster.success(resp.message, 'Suppression réussie');
      },
      error: (error) => {
        this._toaster.danger(error.message, 'Erreur de suppression');
      }
    });
  }
}
