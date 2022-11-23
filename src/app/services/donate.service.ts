import { DonateStatistic } from './../models/statistic.model';
import { Donate, DonateTop } from 'src/app/models/donate.model';
import { environment } from './../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from './spinner.service';
import { DEFAULT_SIZE_TOP_DONATE } from '../base/constant';
import { saveAs } from 'file-saver';

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

    public findListDonate(projectId?): Observable<DonateTop[]> {
        this.spinnerService.show();
        return this.http.get<DonateTop[]>(`${this.url}/list-donate`, { params: { projectId } })
    }

    public findTopDonate2(type: 0 | 1 | null, pageSize = DEFAULT_SIZE_TOP_DONATE, projectId?): Observable<DonateTop[]> {
        this.spinnerService.show();
        const params: any = {};
        if (type != null) params.type = type;
        if (pageSize != null) params.limit = pageSize;
        if (projectId) params.projectId = projectId;
        return this.http.get<DonateTop[]>(`${this.url}/top-donate2`, { params })
    }

    public findDonateByUsername(username: string): Observable<Donate[]> {
        this.spinnerService.show();
        return this.http.post<Donate[]>(`${this.urlAdmin}/username`, { username });
    }

    public statisitcDonate(year: number): Observable<DonateStatistic[]> {
        this.spinnerService.show();
        return this.http.post<DonateStatistic[]>(`${this.urlAdmin}/statistic`, { year });
    }

    public exportFile(projectId: string, fileName): Observable<any> {
        this.spinnerService.show();
        return this.http.post(`${this.url}/export`, { projectId } , {
            responseType: 'arraybuffer',
            observe: 'response'
        } )
            .pipe(tap(res => {
                const blob = new Blob([res.body], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                })
                saveAs(blob, `${fileName}.xls`)
            }))
    }
}