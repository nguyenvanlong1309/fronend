import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthorGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastService: ToastrService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authService.currentUser$.getValue();
        if (!currentUser) return true;
        const roles = route.data.roles as string[];
        if (!roles) return true;
        if (!roles.includes(currentUser.user.role)) {
            this.toastService.warning('Bạn không có quyền thực hiện');
            this.router.navigate(['/auth', 'login']);
            return false;
        }
        return true;
    }
}