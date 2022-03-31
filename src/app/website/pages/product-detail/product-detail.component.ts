import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId!: string | null;
  productDetail!: Product | null;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getProductDetail();
  }


  getProductDetail() {
    this.route.paramMap.pipe(
      switchMap((value) => {
        this.productId = value.get('id');
        if (this.productId) {
          return this.productsService.getOne(this.productId);
        }
        return [];
      })
    ).subscribe({
      next: (rta) => {
        this.productDetail = rta;
      }
    })
  }

  goToBack(): void {
    this.location.back();
  }

}
