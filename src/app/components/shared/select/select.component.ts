import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi:true,
            useExisting: SelectComponent
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {
    
    @Input() items: any[];
    @Input() bindValue: string;
    @Input() bindLabel: string;
    @Input() placeholder: string;

    public ngModel: string = null;
    public onChange = (value) => {};
    public onTouched = () => {}; 
    public touched = false;
    public disabled = false;

    public ngOnChange(): void {
        this.markAsTouched();
        if (!this.disabled) {
            this.onChange(this.ngModel);
        }
    }

    public writeValue(obj: any): void {
        this.ngModel = obj;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
}