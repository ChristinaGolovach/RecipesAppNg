import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DestroyableComponent } from 'src/app/shared/classes/destroyable-component';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends DestroyableComponent implements OnInit {
  isAuthenticated = false;
  user: User;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
      super();
  }

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.isAuthenticated = !!user;
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes([]);
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }
}
