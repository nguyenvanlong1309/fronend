import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Map } from '../models/map.model';

@Injectable({
    providedIn: 'root'
})
export class MapService {

  private url: string = `${environment.API_URL}/maps`

  constructor(
      private http: HttpClient
  ) {}

  public findAll(): Observable<Map[]> {
      return this.http.get<Map[]>(this.url);
  }
}
