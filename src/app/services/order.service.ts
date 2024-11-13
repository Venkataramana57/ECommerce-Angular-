import { Injectable } from "@angular/core";
import { AxiosInstance } from './axios-instance';
import { Observable, from } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class OrderService {
	constructor(private axiosService: AxiosInstance) {}

	addProductToCart(orderId: string): Observable<any> {
		const cartItem = this.axiosService.getAxiosInstance().post(`/add_cart/${orderId}`)
		.then(response => response.data)
		.catch(err => {
			throw err;
		});

		return from(cartItem);
	}

	removeProductFromCart(orderId: string): Observable<any> {
		const cartItem = this.axiosService.getAxiosInstance().post(`/remove_cart/${orderId}`)
		.then(response => response.data)
		.catch(err => { throw err });

		return from(cartItem);
	}

	cartList() {
		const cartItems = this.axiosService.getAxiosInstance().get('/checkout')
		.then(response => response.data)
		.catch(err => { throw err });

		return from(cartItems);
	}

	purchageOrder() {
		const cartItems = this.axiosService.getAxiosInstance().post('/purchage')
		.then(response => response.data)
		.catch(err => { throw err });

		return from(cartItems);
	}
}
