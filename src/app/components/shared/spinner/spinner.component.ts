import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

    public spinnerObservable: Observable<boolean>;
    public isLoading: boolean;
    constructor(
        private spinnerService: SpinnerService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.spinnerService.spinner$.subscribe(res => {
            this.isLoading = res;
            this.cdr.detectChanges();
        })
    }
}