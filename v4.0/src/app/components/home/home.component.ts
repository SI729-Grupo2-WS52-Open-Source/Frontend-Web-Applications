import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  constructor(private product: ProductService) {
  }
  ngOnInit(){
    this.product.popularProducts().subscribe((data) => {
      console.warn(data);
      this.popularProducts = data;
    });
    this.product.trendyProducts().subscribe((data) => {
        this.trendyProducts = data;
    });
  }
}