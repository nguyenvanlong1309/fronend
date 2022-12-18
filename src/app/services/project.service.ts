import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Project } from '../models/project.model';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private url: string = `${environment.API_URL}/projects`;
    private urlAdmin: string = `${environment.API_ADMIN_URL}/projects`;

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public findAll(limit?: number): Observable<Project[]> {
        this.spinnerService.show();
        const params = limit ? { limit } : {}
        return this.http.get<Project[]>(this.url, { params });
    }

    public findPendingProject(): Observable<Project[]> {
        this.spinnerService.show();
        return this.http.get<Project[]>(`${this.url}/pending-project`);
    }

    public findById(projectId: string): Observable<Project> {
        this.spinnerService.show();
        return this.http.get<Project>(`${this.url}/${projectId}`)
    }

    public findMyProject(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.url}/mine`)
    }

    public saveProject(formData: FormData): Observable<Project> {
        this.spinnerService.show();
        return this.http.post<Project>(this.url, formData);
    }

    public updateProject(projectId: string, formData: FormData): Observable<Project> {
        this.spinnerService.show();
        return this.http.put<Project>(`${this.url}/${projectId}`, formData);
    }

    public approveProject(projectId): Observable<Project> {
        this.spinnerService.show();
        return this.http.get<Project>(`${this.urlAdmin}/approve/${projectId}`);
    }

    public lockProject(projectId): Observable<Project> {
      this.spinnerService.show();
      return this.http.get<Project>(`${this.urlAdmin}/lock/${projectId}`);
  }

    public findProjectByUsername(username: string): Observable<Project[]> {
        this.spinnerService.show();
        return this.http.post<Project[]>(`${this.urlAdmin}/username`, { username });
    }
}
