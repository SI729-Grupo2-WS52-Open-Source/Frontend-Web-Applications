import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult: product[] = [];
  originalSearchResult: product[] = [];
  query: string | null = null;
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null; // Agrega esta propiedad
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {
  }

  ngOnInit(): void {
    this.query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(this.query);
    if (this.query) {
      this.product.searchProducts(this.query).subscribe((result) => {
        this.searchResult = result;
        this.originalSearchResult = result;
      });
    }
  }
  subcategories: { category: string; subcategory: string[] }[] = [
    { category: 'Anime', subcategory: ['Chibis', 'Figuras'] },
    { category: 'K-POP', subcategory: ['Girls group', 'Boys group'] },
    { category: 'Lectura', subcategory: ['Mangas', 'Mahuas'] },
  ];

  // Método para obtener las subcategorías relacionadas a la categoría seleccionada
  getSubcategories(category: string): string[] {
    const entry = this.subcategories.find(entry => entry.category === category);
    return entry ? entry.subcategory : [];
  }

// Método para filtrar por subcategoría
  filterResultsBySubcategory(subcategory: string | null) {
    if (subcategory) {
      this.searchResult = this.originalSearchResult.filter(item => item.description === subcategory);
    } else {
      // Si no se ha seleccionado ninguna subcategoría, muestra todos los resultados originales.
      this.searchResult = this.originalSearchResult;
    }
  }


  filterResultsByCategory(category: string | null) {
    if (category) {
      this.searchResult = this.originalSearchResult.filter(item => item.category === category);
    } else {

      this.searchResult = this.originalSearchResult;
    }
  }
}
