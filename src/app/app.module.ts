import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminAddProductComponent } from './components/admin-add-product/admin-add-product.component';
import { AdminUpdateProductComponent } from './components/admin-update-product/admin-update-product.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { UserDetailProfileComponent } from './components/user-detail-profile/user-detail-profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { SuccessfulBuyingComponent } from './components/successful-buying/successful-buying.component';
import {MaterialModule} from "./shared/material.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminAuthComponent,
    AdminHomeComponent,
    AdminAddProductComponent,
    AdminUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
    UserDetailProfileComponent,
    ContactComponent,
    SuccessfulBuyingComponent
  ],
  imports: [
    MaterialModule,
    AppRoutingModule
  ],
  providers: [    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
