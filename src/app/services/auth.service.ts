import { User, UserModel } from '../models/user.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../models/user.model";
import { Observable, BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiAuthUrl: string = `${environment.API_URL}/auth`;
    public currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private router: Router
    ) {}

    public login(login: LoginModel): Observable<UserModel> {
        this.spinnerService.show();
        return this.http.post<UserModel>(`${this.apiAuthUrl}/login`, login)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                    this.currentUser$.next(res);
                })
            );
    }

    public regisUser(user: User): Observable<any> {
        this.spinnerService.show();
        return this.http.post<any>(`${this.apiAuthUrl}/regis-user`, user);
    }

    public logout(): void {
        this.currentUser$.next(null);
        this.router.navigate(['/auth', 'log-in']);
    }
}