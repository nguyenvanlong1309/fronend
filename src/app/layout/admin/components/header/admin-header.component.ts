import { ChangePasswordComponent } from './../../../../components/shared/change-password/change-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserFormComponent } from 'src/app/components/admin/user/user-form/user-form.component';

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

    public ngOnAddAdmin() {
        this.ngbModal.open(UserFormComponent, {
            centered: true,
            animation: true,
        });
    }

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