import { AbstractControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { EditorConfig } from "./editor.config";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges, OnInit {
    
    @Input() control: AbstractControl;
    @Input() defaultValue: string;

    public config: AngularEditorConfig = EditorConfig.editorConfig;
    public ngModel: string;

    constructor() {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['defaultValue']?.isFirstChange) {
            this.ngModel = this.defaultValue;
        }
    }

    public ngOnInit(): void {
        
    }

    public onChange(): void {
        if (this.control) {
            this.control.setValue(this.ngModel);
        }
    }
}