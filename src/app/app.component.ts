import { Component } from '@angular/core';
import { MenuItem } from './shared/enums/menuItems.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems = MenuItem;
  currentMenuItem = MenuItem.Recipe;

  onNavigate(menuItem: MenuItem): void {
    this.currentMenuItem = menuItem;
  }
}
