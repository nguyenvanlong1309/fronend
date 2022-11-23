import { Utils } from 'src/app/base/utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Confirmation } from 'src/app/base/confirmation/confirmation.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { BankService } from './../../../services/bank.service';
import { Component, OnInit } from "@angular/core";
import { Bank } from 'src/app/models/bank.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

    public bank$: Observable<Bank[]>;
    public money: number;

    public step: {
        index: number,
        bank?: Bank,
        readonly maxStep: number,
    } = {index: 0, maxStep: 3};

    public formCard: FormGroup;
    public formOtp: FormGroup;

    constructor(
        private bankService: BankService,
        private activedModal: NgbActiveModal,
        private fb: FormBuilder,
        private toastService: ToastrService
    ) {}

    public ngOnInit(): void {
        this.bank$ = this.bankService.findAllBank();
        this.ngOnBuildFormCard();
        this.ngOnBuildFormOtp();
    }

    private ngOnBuildFormCard(): void {
        this.formCard = this.fb.group({
            cardNumber: [null, [Validators.required]],
            expiredDate: [null, [Validators.required]],
            secCode: [null, [Validators.required]]
        });
    }

    public ngOnBuildFormOtp(): void {
        this.formOtp = this.fb.group({
            otp: [null, [Validators.required]]
        });
    }

    public ngOnSubmitFormCard(): void {
        Utils.beforeSubmitFomr(this.formCard);
        if (this.formCard.invalid) {
            this.toastService.error('Thông tin thẻ chưa hợp lệ');
            return;
        };
        this.formOtp.reset();
        this.ngOnNextStep();
    }

    public ngOnSubmitFormOtp(): void {
        Utils.beforeSubmitFomr(this.formOtp);
        Utils.beforeSubmitFomr(this.formCard);
        if (!this.step.bank || this.formCard.invalid || this.formOtp.invalid) {
            this.toastService.error('Thông tin xác thực không hợp lệ');
            return;
        }

        const { otp } = this.formOtp.value;
        if (otp != '123456') {
            this.toastService.error('Mã OTP không đúng');
            return;
        }
        this.activedModal.close(Confirmation.CONFIRM);
    }

    public ngOnNextStep(): void {
        if (this.step.index + 1 == this.step.maxStep) return;
        this.step.index = this.step.index + 1
    }

    public ngOnPrevStep(): void {
        if (this.step.index == 0) return;
        this.step.index = this.step.index - 1;
    }

    public ngOnCancel(): void {
        this.activedModal.close(Confirmation.CANCEL);
    }

}