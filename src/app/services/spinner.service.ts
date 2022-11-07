import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    public spinner$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public show(): void {
        this.spinner$.next(true);
    }

    public hide(): void {
        this.spinner$.next(false);
    }
}