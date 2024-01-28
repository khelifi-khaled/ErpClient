import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItemsComponent } from './pages/items/items.component';
import { InvoicesComponent } from './pages/Invoices/invoices.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConsultItemComponent } from './pages/consultItem/consultItem.component';
import { ConsultCustomerComponent } from './pages/consultCustomer/consultCustomer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ItemsComponent,
    InvoicesComponent,
    CustomersComponent,
    ConsultItemComponent,
    ConsultCustomerComponent
    
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
