import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor (
        private _sanitizer: DomSanitizer
    ){}

    transform(value: any, arg: string): SafeHtml | SafeResourceUrl {
        if (!arg) {
            return this._sanitizer.bypassSecurityTrustHtml(value);
        }

        switch(arg) {
            case 'html':
                return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                return this._sanitizer.bypassSecurityTrustHtml(value);
        }
    }
}