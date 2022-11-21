import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { MapService } from "src/app/services/map.service";
import { Map } from 'src/app/models/map.model';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city.model';
import { MyProjectComponent } from '../setting/my-project/my-project.component';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    public map$: Observable<Map[]>;
    public city$: Observable<City[]>;
    public city: number = null;

    constructor(
        private mapService: MapService,
        private cityService: CityService,
        private ngbModal: NgbModal,
    ) {}

    public ngOnInit(): void {
        this.map$ = this.mapService.findAll();
        this.city$ = this.cityService.findAll();
    }

    public showProject(map: Map): void {
        const ref = this.ngbModal.open(MyProjectComponent, {
            size: 'xl',
            centered: true,
            animation: true
        });
        const instant = ref.componentInstance as MyProjectComponent;
        instant.data$ = of(map.projects);
        instant.title = `${map.cityName} - ${map.projects.length} dự án`;
        instant.onlyView = true;
    }

    public ngOnChangeCity(): void {
        const el = document.getElementById(`${this.city}`);
        let newScrollY = window.pageYOffset + el.getBoundingClientRect().top;
        newScrollY = newScrollY - document.documentElement.clientHeight/2;
        window.scrollTo({top: newScrollY, behavior: 'smooth'});
    }
}