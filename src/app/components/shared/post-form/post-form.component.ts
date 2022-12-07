import { Project } from 'src/app/models/project.model';
import { takeUntil } from 'rxjs/operators';
import { Utils } from './../../../base/utils';
import { TYPE_PROJECT } from './../../../base/constant';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CityService } from "src/app/services/city.service";
import { City } from 'src/app/models/city.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public project: Project;
    public city$: Observable<City[]>;
    public formGroup: FormGroup;
    public avatarFile: {file: File, url: string};
    public typeProject;
    public moneyAsText: string;

    constructor(
        private cityService: CityService,
        public activedModal: NgbActiveModal,
        private fb: FormBuilder,
        private toastService: ToastrService,
        private postService: ProjectService
    ) {}

    public ngOnInit(): void {
        this.typeProject = TYPE_PROJECT;
        this.city$ = this.cityService.findAll();
        this.ngOnBuildForm();
        if (this.project) {
            this.formGroup.patchValue(this.project);
            this.avatarFile = {
                url: `${environment.IMAGE_STORE_URL}${this.project.avatar}`,
                file: null
            }
        }
    }

    private ngOnBuildForm(): void {
        this.formGroup = this.fb.group({
            id: [null],
            cityId: [1, [Validators.required]],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            startDate: [null],
            endDate: [null],
            description: [null, [Validators.required]],
            type: [0],
            money: [null, [Validators.required]]
        });
        this.formGroup.get('money').valueChanges.subscribe(money => {
            this.moneyAsText = Utils.moneyAsText(money);
        })
        this.formGroup.get('startDate').setValidators([Validators.required, customValidateDate(this.formGroup, 'endDate')])
        this.formGroup.get('endDate').setValidators([Validators.required, customValidateDate(this.formGroup, 'startDate')])
        this.formGroup.get('type').valueChanges.subscribe(res => {
            if (res == 0) {
                this.formGroup.get('endDate').setValidators([Validators.required, customValidateDate(this.formGroup, 'startDate')]);
            } else {
                this.formGroup.get('endDate').setValidators([]);
            }
            this.formGroup.get('endDate').updateValueAndValidity();
            this.formGroup.get('startDate').updateValueAndValidity();
        })
    }

    public ngOnChangeAvatarFile(event: any): void {
        const { files } = event.target;
        if (files && files.length) {
            const [ file ] = files;
            const { type } = file;
            if (!type.match(/image\/*/)) {
                this.toastService.error('Ảnh không đúng định dạng');
                return;
            }

            const url = URL.createObjectURL(file);
            this.avatarFile = {
                file: file,
                url: url
            }
        }
    }

    public deleteAvatarFile(): void {
        this.avatarFile = null;
    }

    public ngOnSubmit(): void {
        Utils.beforeSubmitForm(this.formGroup);
        if (this.formGroup.invalid || !this.avatarFile) return;
        const value = this.formGroup.value;
        if (value.type == 1) {
            delete value.endDate;
        }
        const formData = new FormData();
        formData.append('avatarFile', this.avatarFile.file);
        formData.append('project', new Blob([JSON.stringify(value)], {
            type: 'application/json'
        }));
        (value.id ? this.postService.updateProject(value.id, formData) :this.postService.saveProject(formData))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.activedModal.close('OK');
                this.toastService.success(value.id ? 'Cập nhật thành công' :'Đăng bài thành công');
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.next();
        this.unsubscribe$?.complete();
    }
}

function customValidateDate(formGroup: FormGroup, formControlName: 'startDate' | 'endDate'): ValidatorFn {
    const comparedControl = formGroup.get(formControlName);
    return (control: AbstractControl): ValidationErrors | null => {
        const type = formGroup.get('type').value;
        if (type == 1) return null;
        const d1 = formatDate(control.value, 'yyyy-MM-dd', 'en-US');
        const d2 = formatDate(comparedControl.value, 'yyyy-MM-dd', 'en-US');
        
        if (!comparedControl?.value) return null;

        if (formControlName == 'startDate') {
            // => control = endDate
            if (d1 <= d2) {
                return {
                    isInvalid: true
                }
            }
        }

        if (formControlName == 'endDate') {
            // => control = starTime
            if (d2 <= d1) {
                return {
                    isInvalid: true
                }
            }
        }

        return null;
    }
}