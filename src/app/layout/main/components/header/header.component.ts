import { Component, OnInit } from "@angular/core";
import { UserResponseModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-header-main-layout',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
    public isLoggedIn: boolean = false;
    public user: UserResponseModel;

    constructor(
        private loginService: AuthService
    ) {}

    public ngOnInit(): void {
        const currentUser = this.loginService.currentUser$.getValue();
        this.isLoggedIn = currentUser != null;
        this.user = currentUser?.user;
    }

    public ngLogout(): void {
        this.loginService.logout();
    }
}