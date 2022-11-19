import { Donate, DonateTop } from 'src/app/models/donate.model';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from './spinner.service';
import { DEFAULT_SIZE_TOP_DONATE } from '../base/constant';

@Injectable({
    providedIn: 'root'
})
export class DonateService {

    private url: string = `${environment.API_URL}/donates`;
    private urlAdmin: string = `${environment.API_ADMIN_URL}/donates`;

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public findAll(): Observable<Donate[]> {
        this.spinnerService.show();
        return this.http.get<Donate[]>(this.urlAdmin);
    }

    public donatePersonal(donate: Donate): Observable<Donate> {
        this.spinnerService.show();
        return this.http.post<Donate>(`${this.url}/personal`, donate);
    }

    public donateBusiness(formData: FormData): Observable<Donate> {
        this.spinnerService.show();
        return this.http.post<Donate>(`${this.url}/business`, formData);
    }

    public findMyDonate(): Observable<Donate[]> {
        this.spinnerService.show();
        return this.http.get<Donate[]>(`${this.url}/mine`);
    }

    public findTopDonate(type: 0 | 1): Observable<DonateTop[]> {
        this.spinnerService.show();
        return this.http.get<DonateTop[]>(`${this.url}/top-donate`, {
            params: {
                limit: DEFAULT_SIZE_TOP_DONATE,
                type: type,
            }
        })
    }

    public findDonateByUsername(username: string): Observable<Donate[]> {
        this.spinnerService.show();
        return this.http.post<Donate[]>(`${this.urlAdmin}/username`, { username });
    }
}