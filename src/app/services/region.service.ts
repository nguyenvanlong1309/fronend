import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Region } from '../models/region.model';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    private urlAdmin: string = `${environment.API_ADMIN_URL}/regions`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService
    ) {}
    
    public findProjectByYear(year: number): Observable<Region[]> {
        this.spinnerService.show();
        return this.http.get<Region[]>(this.urlAdmin, {
            params: { year }
        });
    }
}