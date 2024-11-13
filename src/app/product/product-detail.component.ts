import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'product-detail',
	standalone: true,
	imports: [MatCardModule, CommonModule],
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
	defaultImage: string = 'assets/ang.png';
	product: any = null;
	isRetailer: boolean = false;

	constructor(private authService: AuthService,
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute,
		private orderService: OrderService,
		private snackBar: MatSnackBar
	) {
		this.isRetailer = this.authService.isRetailer();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe({
				next: data => {
					this.product = data;
				},
				error: err => {
					console.log(err)
				}
			})
    });
	}

	gotoProducts() {
		this.router.navigate(['/products']);
	}

	gotoCart() {
		this.router.navigate(['/cart']);
	}

	addToCart(product: any) {
		if(this.isRetailer) return;

		this.orderService.addProductToCart(product._id).subscribe({
			next: data => {
				if(data) {
					this.snackBar.open('Item added to cart', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
				}
			},
			error: () => {
				this.snackBar.open('Something went wrong in adding item to cart', '', {
					duration: 3000,
					horizontalPosition: 'end',
					verticalPosition: 'top',
					panelClass: ['error-snackbar'],
				});
			}
		})
	}

	removeFromCart(orderId: string) {
		if(this.isRetailer) return;

		this.orderService.removeProductFromCart(orderId).subscribe({
			next: data => {
				if(data) {
					this.snackBar.open('Item added to cart', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
				}
			},
			error: () => {
				this.snackBar.open('Something went wrong in adding item to cart', '', {
					duration: 3000,
					horizontalPosition: 'end',
					verticalPosition: 'top',
					panelClass: ['error-snackbar'],
				});
			}
		})
	}
}