import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component } from "@angular/core";
import { EditorConfig } from "./editor.config";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi:true,
            useExisting: EditorComponent
        }
    ]
})
export class EditorComponent implements ControlValueAccessor {
    
    public config: AngularEditorConfig = EditorConfig.editorConfig;
    public ngModel: string;
    public _onChange = (value) => {};
    public onTouched = () => {}; 
    public touched = false;
    public disabled = false;

    constructor() {}

    public onChange(): void {
        this.markAsTouched();
        if (!this.disabled) {
            this._onChange(this.ngModel);
        }
    }

    public writeValue(obj: any): void {
        this.ngModel = obj;
    }

    public registerOnChange(fn: any): void {
        this._onChange = fn;
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