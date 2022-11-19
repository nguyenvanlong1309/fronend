import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from "@angular/core";
import { Confirmation } from 'src/app/base/confirmation/confirmation.enum';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

    public content: {title: string, message: string};

    constructor(
        private activeModal: NgbActiveModal
    ) {}

    public ngOnSubmit(): void {
        this.activeModal.close(Confirmation.CONFIRM);
    }

    public ngOnCancel(): void {
        this.activeModal.close(Confirmation.CANCEL);
    }
}