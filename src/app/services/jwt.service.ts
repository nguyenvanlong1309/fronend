import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr'

@Injectable({
    providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

    constructor(
        private loginService: AuthService,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.loginService.currentUser$.getValue();
        const request = req.clone({
            headers: new HttpHeaders({
                'Authorization': currentUser?.token ?? ''
            })
        });
        return next.handle(req)
            .pipe(
                tap({
                    next: res => {
                        if (res instanceof HttpResponse) {
                            this.spinnerService.hide();
                        }
                    },
                    error: (e: HttpErrorResponse) => {
                        this.spinnerService.hide();
                        
                        // nếu lỗi là chưa đăng nhập hoặc không có quyền thực hiện
                        // thì sẽ router tới trang login.
                        if (e.status == HttpStatusCode.Unauthorized || e.status == HttpStatusCode.Forbidden) {
                            this.router.navigate(['/auth', 'log-in']);
                            return;
                        }
                        console.log(e);
                        this.toastrService.error(e.error?.message ?? 'Có lỗi xảy ra trong quá trình xử lý.')
                    }
                })
            )
    }
}