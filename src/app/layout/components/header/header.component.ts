import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'src/app/shared/enums/menuItems.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuItemSelected = new EventEmitter<MenuItem>();

  menuItem = MenuItem;

  constructor() { }

  ngOnInit(): void {
  }

  onNavigationSelect(selectedMenuItem: MenuItem): void {
    this.menuItemSelected.emit(selectedMenuItem);
  }
}
