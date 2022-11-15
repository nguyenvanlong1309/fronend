import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { City } from '../models/city.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private url: string = `${environment.API_URL}/cities`

    constructor(
        private http: HttpClient
    ){}

    public findAll(): Observable<City[]> {
        return this.http.get<City[]>(this.url);
    }
}