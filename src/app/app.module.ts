import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbToastrModule, NbCardModule, NbDialogModule, NbSelectModule, NbIconModule } from '@nebular/theme';
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
    ErrorComponent
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
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
