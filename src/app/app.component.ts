import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private loginService: AuthService,
  ) {}

  ngOnInit(): void {
    const userModel = JSON.parse(window.localStorage.getItem('sessionUser') || 'null')
    if (userModel) {
      this.loginService.currentUser$.next(userModel);
      window.localStorage.removeItem('sessionUser');
    };
  }

  @HostListener('window:beforeunload')
  public reloadPage(): void {
    window.localStorage.removeItem('sessionUser');
    const userModel = this.loginService.currentUser$.getValue();
    if (userModel) {
      window.localStorage.setItem('sessionUser', JSON.stringify(userModel));
    }
  }
}
