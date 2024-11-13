import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { CartComponent } from './order/cart.component';


export const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
	{ path: 'products', component: ProductListComponent},
	{ path: 'products/:id', component: ProductDetailComponent},
	{ path: 'cart', component: CartComponent},
];
