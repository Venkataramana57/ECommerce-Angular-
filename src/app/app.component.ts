import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileMenuComponent } from './profile/profile-menu.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileMenuComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shopping-ang';
}
