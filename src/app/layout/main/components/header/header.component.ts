import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChangePasswordComponent } from "src/app/components/shared/change-password/change-password.component";
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
        private loginService: AuthService,
        private ngbModal: NgbModal
    ) {}

    public ngOnInit(): void {
        const currentUser = this.loginService.currentUser$.getValue();
        this.isLoggedIn = currentUser != null;
        this.user = currentUser?.user;
    }

    public ngOnChangePassword(): void {
        this.ngbModal.open(ChangePasswordComponent, {
            centered: true,
            animation: true,
        });
    }

    public ngLogout(): void {
        this.loginService.logout();
    }
}
