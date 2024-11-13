import { Injectable, Inject } from '@angular/core';
import { AxiosInstance } from './axios-instance';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private axiosService: AxiosInstance) {}

	getProducts(): Observable<any> {
    const products = this.axiosService.getAxiosInstance().get('/products')
      .then(response => response.data)
      .catch(error => { throw error });

    return from(products);
  }

  getProductById(id: string): Observable<any> {
    const product =  this.axiosService.getAxiosInstance().get(`/products/${id}`)
      .then(response => response.data)
      .catch(error => { throw error });

    return from(product);
  }
}
