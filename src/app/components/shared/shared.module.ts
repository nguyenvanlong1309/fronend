import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SafePipe } from "src/app/pipe/safe.pipe";
import { EditorComponent } from "./editor/editor.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { SelectComponent } from "./select/select.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularEditorModule,
        NgbModule
    ],
    declarations: [
        PostFormComponent,
        EditorComponent,
        SelectComponent,

        SafePipe,
    ],
    exports: [
        PostFormComponent,
        EditorComponent,
        SelectComponent,

        SafePipe,
    ]
})
export class SharedModule {}