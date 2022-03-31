import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, 
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCategoryId();

    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.productId = params.get('product');
      }
    })
  }

  getCategoryId() {
    this.activatedRoute.paramMap.pipe(
      switchMap((value) => {
        this.categoryId = value.get('id');
        if (this.categoryId) {
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      })
    ).subscribe({
      next: (rta) => {
        this.products = rta;
      }
    })

  }

  loadMore() {
   if (this.categoryId)
    this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
      });
  }

}
