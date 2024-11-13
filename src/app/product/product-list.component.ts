import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
	imports: [CommonModule,
            MatCardModule,
            MatGridListModule,
            MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  products: any[] = [];
  defaultImage: string = 'assets/ang.png'

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
			next: data => {
				this.products = data;
			},
			error: error => {
				console.error('Something wrong:', error);
			}
    });
  }

  addToCart(product: any) {
    
  }

  viewDetails(product: any) {
    console.log(11111, product)
    this.router.navigate(['/products', product._id]);
  }

	deleteProduct(id: string) {
    
  }
}
