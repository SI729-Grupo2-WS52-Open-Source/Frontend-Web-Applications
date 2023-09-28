import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {product} from "../../models/user.model";

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.css']
})
export class SearchContentComponent {
  searchResult: undefined | product[];
  constructor(private activeRouter: ActivatedRoute, private product: ProductService) {
  }

  ngOnInit(): void{
    let query = this.activeRouter.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    })
  }
}
