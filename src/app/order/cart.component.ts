import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
	imports: [CommonModule,
            MatCardModule,
            MatGridListModule,
            MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent implements OnInit {
  cartItems: any[] = [];
  defaultImage: string = 'assets/ang.png'

  constructor(
		private orderService: OrderService,
		private router: Router,
		private snackBar: MatSnackBar
	) {}

  ngOnInit() {
    this.orderService.cartList().subscribe({
			next: data => {
				this.cartItems = data;
			},
			error: error => {
				console.error('Something wrong:', error);
			}
    });
  }

	removeFromCart(orderId: string) {
		this.orderService.removeProductFromCart(orderId).subscribe({
			next: data => {
				if(data) {
					this.snackBar.open('Item removed from cart', '', {
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

  viewDetails(product: any) {
    console.log(11111, product)
    this.router.navigate(['/products', product._id]);
  }

	deleteProduct(id: string) {
    
  }
}
