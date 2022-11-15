import { Donate } from 'src/app/models/donate.model';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class DonateService {

    private url: string = `${environment.API_URL}/donates`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public donatePersonal(donate: Donate): Observable<Donate> {
        return this.http.post<Donate>(`${this.url}/personal`, donate);
    }

    public findMyDonate(): Observable<Donate[]> {
        this.spinnerService.show();
        return this.http.get<Donate[]>(`${this.url}/mine`);
    }
}