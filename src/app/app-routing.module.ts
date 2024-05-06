import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './pages/items/items.component';
import { InvoicesComponent } from './pages/Invoices/invoices.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ConsultItemComponent } from './pages/consultItem/consultItem.component';
import { ConsultCustomerComponent } from './pages/consultCustomer/consultCustomer.component';
import { EditOrAddItemComponent } from './pages/edit-or-add-item/edit-or-add-item.component';


const routes: Routes = [
  { path: '', redirectTo :'items', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent },
  { path: 'invoices', component: InvoicesComponent },
  {path: 'customers', component: CustomersComponent},
  {path: 'consultItem', component: ConsultItemComponent},
  {path: 'consultCustomer', component: ConsultCustomerComponent},
  {path: 'addOreditItem', component: EditOrAddItemComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
