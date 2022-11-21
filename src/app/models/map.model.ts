import { Project } from 'src/app/models/project.model';

export interface Map {
    id: number;
    path: string;
    cityId: number;
    cityName: string;
    projects: Project[];
}