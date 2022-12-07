import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
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
        NgbModule,
        HttpClientModule,
        CKEditorModule,
    ],
    declarations: [
        PostFormComponent,
        EditorComponent,
        SelectComponent,

        SafePipe,
    ],
    exports: [
        PostFormComponent,
        SelectComponent,
        EditorComponent,

        SafePipe,
    ]
})
export class SharedModule {}