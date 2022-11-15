import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'img'
})
export class ImagePipe implements PipeTransform {

    transform(value: any): string {
        return `${environment.IMAGE_STORE_URL}${value}`;
    }
}