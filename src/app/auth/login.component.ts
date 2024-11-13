import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./auth.component.css'],
})

export class LoginComponent{
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) {
    if(this.authService.isUserLoggedIn()) {
      this.router.navigate(['/products']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      this.snackBar.open('Please enter Email and Password', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',      
        panelClass: ['error-snackbar'],
      });
      return;  
    }

    const credentials = {
      email: this.f['email'].value,
      password: this.f['password'].value
    }

		this.authService.login(credentials).subscribe({
      next: data => {
        if(data.user) {
          this.sessionService.login(data)
          this.snackBar.open('Successfully Loggedin!', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',      
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/products']);
        } else {
          this.snackBar.open('Invalid Credentials', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',      
            panelClass: ['error-snackbar'],
          });
          return;  
        }
      },
      error: error => {
        this.snackBar.open(error, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',      
          panelClass: ['error-snackbar'],
        });
        return;  
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
