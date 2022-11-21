import { ChangePasswordComponent } from './../../../../components/shared/change-password/change-password.component';
import { ChangePassword } from './../../../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
    
    constructor(
        private authService: AuthService,
        private ngbModal: NgbModal
    ) {}

    public ngOnChangePassword(): void {
        this.ngbModal.open(ChangePasswordComponent, {
            centered: true,
            animation: true,
        });
    }

    public ngOnLogout() {
        this.authService.logout();
    }
}