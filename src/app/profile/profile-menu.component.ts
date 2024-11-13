import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from './../services/session.service';  // Import the session service

@Component({
  selector: 'app-profile-menu',
	standalone: true,
	imports: [CommonModule],
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
})
export class ProfileMenuComponent implements OnInit {
  isMenuVisible: boolean = false;
  username: string = '';
  email: string = '';

  constructor(
		private sessionService: SessionService,
		private router: Router
	) {}

  ngOnInit() {
    this.sessionService.user$.subscribe((user: any) => {
      if (user) {
        this.username = user.name;
        this.email = user.email;
      } else {
        this.email = '';
      }
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  async logout() {
    await this.sessionService.logout();
		this.router.navigate(['/login']);
  }
}