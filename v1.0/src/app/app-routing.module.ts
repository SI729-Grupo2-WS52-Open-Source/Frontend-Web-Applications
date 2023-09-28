import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeContentComponent} from "./components/home-content/home-content.component";
import {RegisterContentComponent} from "./components/register-content/register-content.component";
import {UserHomeComponent} from "./components/user-home/user-home.component";
import {authGuard} from './auth.guard'
import {ProductsContentComponent} from "./components/products-content/products-content.component";
import {
  SellerUpdateProductContentComponent
} from "./components/seller-update-product-content/seller-update-product-content.component";
import {SearchContentComponent} from "./components/search-content/search-content.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {UserAuthComponent} from "./components/user-auth/user-auth.component";

const routes: Routes = [
  {path: 'home', component: HomeContentComponent},
  {path: 'register', component: RegisterContentComponent},
  {path: 'user-home', component: UserHomeComponent, canActivate: [authGuard]},
  {path: 'add-products', component: ProductsContentComponent, canActivate: [authGuard]},
  {path: 'seller-update-products/:id', component: SellerUpdateProductContentComponent, canActivate: [authGuard]},
  {path: 'search/:query', component: SearchContentComponent},
  {path: 'details/:productId', component: ProductDetailsComponent},
  {path: 'user-auth', component: UserAuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
