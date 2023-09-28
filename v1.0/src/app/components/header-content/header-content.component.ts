import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {product} from "../../models/user.model";

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css']
})

export class HeaderContentComponent {
  menuType: string = 'default';
  userName: string = "";
  searchResult: undefined | product[];
  usersName:string="";
  constructor(private router: Router, private product: ProductService) {
  }

  ngOnInit(): void{
    this.router.events.subscribe((val: any) => {
       if (val.url){
         if (localStorage.getItem('user') && val.url.includes('user')){
            if (localStorage.getItem('user')){
              let userStore=localStorage.getItem('user');
              let userData = userStore && JSON.parse(userStore)[0];
              this.userName = userData && userData.name;
              this.menuType="user";
            }
         }else if(localStorage.getItem('users')){
            let usersStore = localStorage.getItem('users');
            let usersData = usersStore && JSON.parse(usersStore);
            this.usersName = usersData.name;
           this.menuType="users";
         } else{
           console.warn("outside user");
           this.menuType = 'default';
         }
       }
    })
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
  userlogOut(){
    localStorage.removeItem('users');
    this.router.navigate(['/home']);
  }
  searchProduct(query: KeyboardEvent){
    if (query){
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
          if (result.length > 5){
              result.length = 5;
          }
          this.searchResult = result;
      });
    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(val: string){
      console.warn(val);
      this.router.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number){
    this.router.navigate(['/details/'+ id]);

  }
}
