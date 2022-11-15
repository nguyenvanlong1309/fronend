import { User, UserResponseModel } from './../models/user.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = `${environment.API_URL}/users`;

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public updateInfo(user: User): Observable<UserResponseModel> {
        this.spinnerService.show();
        return this.http.put<UserResponseModel>(this.url, user);
    }
}