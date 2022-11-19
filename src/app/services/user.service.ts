import { User, UserResponseModel } from './../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = `${environment.API_URL}/users`;
    private urlAdmin: string = `${environment.API_ADMIN_URL}/users`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastService: ToastrService
    ) {}

    public updateInfo(user: User): Observable<UserResponseModel> {
        this.spinnerService.show();
        return this.http.put<UserResponseModel>(this.url, user);
    }

    public findAllUser(): Observable<UserResponseModel[]> {
        this.spinnerService.show();
        return this.http.get<UserResponseModel[]>(this.urlAdmin);
    }

    public lockUser(username: string): Observable<UserResponseModel> {
        this.spinnerService.show();
        return this.http.get<UserResponseModel>(`${this.urlAdmin}/lock/${username}`)
            .pipe(tap(res => {
                this.toastService.success('Khóa user thành công.');
            }));
    }

    public unlockUser(username: string): Observable<UserResponseModel> {
        this.spinnerService.show();
        return this.http.get<UserResponseModel>(`${this.urlAdmin}/unlock/${username}`)
            .pipe(tap(res => {
                this.toastService.success('Mở khóa user thành công.');
            }));
    }
}