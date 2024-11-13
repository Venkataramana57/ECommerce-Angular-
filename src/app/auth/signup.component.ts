import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./auth.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['customer', Validators.required]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.snackBar.open('All fields are required!', '', {
        duration: 3000,
        horizontalPosition: 'end',
            verticalPosition: 'top',      
        panelClass: ['error-snackbar'],
      });
      return;
    };

    if (this.f['password'].value !== this.f['confirmPassword'].value) {
      this.snackBar.open("Password doesn't match", '', {
        duration: 3000,
        horizontalPosition: 'end',
            verticalPosition: 'top',      
        panelClass: ['error-snackbar'],
      });
      return;
    }

    const registerForm = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      role: this.f['role'].value
    };

    this.authService.signup(registerForm).subscribe({
      next: data => {
        if (data.info) {
          this.snackBar.open('Signup successful!', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['/login']);
        } else {
          this.snackBar.open(data, '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',      
            panelClass: ['success-snackbar'],
          });
        }
      },
      error: error => {
        this.snackBar.open(error, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',      
          panelClass: ['success-snackbar'],
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
