import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, 
        NbLayoutModule, 
        NbButtonModule,
        NbToastrModule, 
        NbCardModule, 
        NbDialogModule, 
        NbSelectModule, 
        NbIconModule, 
        NbTreeGridModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItemsComponent } from './pages/items/items.component';
import { InvoicesComponent } from './pages/Invoices/invoices.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultItemComponent } from './pages/consultItem/consultItem.component';
import { ConsultCustomerComponent } from './pages/consultCustomer/consultCustomer.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { EditOrAddItemComponent } from './pages/edit-or-add-item/edit-or-add-item.component';
import { ErrorComponent } from './components/error/error.component';
import { EditOrAddCustomerComponent } from './pages/edit-or-add-customer/edit-or-add-customer.component';
import { ConsultInvoiceComponent } from './pages/consult-invoice/consult-invoice.component';
import { AddOrEditInvoiceComponent } from './pages/add-or-edit-invoice/add-or-edit-invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ItemsComponent,
    InvoicesComponent,
    CustomersComponent,
    ConsultItemComponent,
    ConsultCustomerComponent,
    LoaderComponent,
    EditOrAddItemComponent,
    ErrorComponent,
    EditOrAddCustomerComponent,
    InvoicesComponent,
    ConsultInvoiceComponent,
    AddOrEditInvoiceComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSelectModule,
    ReactiveFormsModule,
    NbIconModule,
    NbTreeGridModule,
    NbThemeModule.forRoot({ name: 'default' }),
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
