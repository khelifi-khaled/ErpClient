import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from 'src/app/models/customer.models';
import { CustomersService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
constructor(
    private readonly _customerService : CustomersService
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
   this._customerService.getCustomer(customer)
  }
  AddCustomer() : void {
    console.log('Add Customer');
  }

  EditCustomer(customer : Customer) : void {
    console.log('Edit Customer');
  }

  DeleteCustomer(customer : Customer) : void {
    console.log('Delete Customer');
  }
}
