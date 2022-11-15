import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnChanges, OnInit {
    
    @Input() items: any[];
    @Input() bindValue: string;
    @Input() bindLabel: string;
    @Input() placeholder: string;
    @Input() defaultValue: any;
    @Input() control: AbstractControl;
    @Input() defaultFistItem: boolean;

    @Output() change: EventEmitter<any> = new EventEmitter();

    public ngModel: string = null;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['items']?.isFirstChange && this.items) {
            if (this.defaultFistItem && !this.defaultValue) {
                this.ngModel = this.items[0][this.bindValue];
                this.ngOnChange();
            }
        }
    }

    public ngOnInit(): void {
        if (this.defaultValue) this.ngModel = this.defaultValue;
    }

    public ngOnChange(): void {
        if (this.control) {
            this.control.setValue(this.ngModel);
        }
        this.change.emit(this.ngModel);
    }
}