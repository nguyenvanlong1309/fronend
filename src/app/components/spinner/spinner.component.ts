import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

    public spinnerObservable: Observable<boolean>;

    constructor(
        private spinnerService: SpinnerService
    ) {}

    ngOnInit(): void {
        this.spinnerObservable = this.spinnerService.spinner$.asObservable();
    }
}