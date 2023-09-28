import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderContentComponent } from './components/header-content/header-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { HomeContentComponent } from './components/home-content/home-content.component';
import { RegisterContentComponent } from './components/register-content/register-content.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { UserHomeComponent } from './components/user-home/user-home.component';
import { ProductsContentComponent } from './components/products-content/products-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductContentComponent } from './components/seller-update-product-content/seller-update-product-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchContentComponent } from './components/search-content/search-content.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderContentComponent,
    HomeContentComponent,
    RegisterContentComponent,
    UserHomeComponent,
    ProductsContentComponent,
    SellerUpdateProductContentComponent,
    SearchContentComponent,
    ProductDetailsComponent,
    UserAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
