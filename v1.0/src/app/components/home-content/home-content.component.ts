import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {formatCurrency, NgIf} from '@angular/common';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/user.model";
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  constructor(private product: ProductService) {
  }

  ngOnInit(): void{
    this.product.popularProducts().subscribe((data) => {
      console.warn(data);
      this.popularProducts = data;
    });
      this.product.trendyProducts().subscribe((data) => {
          this.trendyProducts = data;
      });
  }

  protected readonly formatCurrency = formatCurrency;
}
