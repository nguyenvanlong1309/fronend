import { Project } from "./project.model";

export interface Region {
    id: number;
    name: string;
    projects: Project[];
}