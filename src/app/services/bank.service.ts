import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Bank } from '../models/bank.model';
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class BankService {

    private url: string = 'https://api.vietqr.io/v2/banks';

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastService: ToastrService
    ) {}

    public findAllBank(): Observable<Bank[]> {
        this.spinnerService.show();
        return this.http.get<Bank[]>(this.url)
            .pipe(
                map<any, Bank[]>(res => {
                    if (res.code != '00') 
                        throw new Error();
                    return res.data;
                }),
                catchError(error => {
                    this.toastService.error('Lỗi lấy danh sách ngân hàng.')
                    throw new Error();
                })
            )
    }
}