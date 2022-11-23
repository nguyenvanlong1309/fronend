import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class Utils {
  public static beforeSubmitFomr(form: FormGroup): void {
    const controls = form.controls;
    for (let c in controls) {
      const control = controls[c];

      if (typeof control.value == 'string' && Boolean(control.value)) {
        control.setValue(control.value.trim());
      }

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      } else {
        this.beforeSubmitFomr(control as FormGroup);
      }
    }
  }

  public static toLowerCaseNonAccentVietnamese(str: string) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    str = str.replace(/\u02C6|\u0306|\u031B/g, '');
    return str;
  }

  static readonly defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';
  static readonly chuHangDonVi = ('1 một' + this.defaultNumbers).split(' ');
  static readonly chuHangChuc = ('lẻ mười' + this.defaultNumbers).split(' ');
  static readonly chuHangTram = ('không một' + this.defaultNumbers).split(' ');
  static readonly dvBlock = '1 nghìn triệu tỷ'.split(' ');

  public static moneyAsText(money: number | string | null): string {
    if (!money) return "";
    const convert_block_three = (number) => {
      if (number == '000') return '';
      const _a = number + ''; //Convert biến 'number' thành kiểu string

      //Kiểm tra độ dài của khối
      switch (_a.length) {
        case 0:
          return '';
        case 1:
          return this.chuHangDonVi[_a];
        case 2:
          return convert_block_two(_a);
        case 3:
          let chuc_dv = '';
          if (_a.slice(1, 3) != '00') {
            chuc_dv = convert_block_two(_a.slice(1, 3));
          }
          const tram = this.chuHangTram[_a[0]] + ' trăm';
          return tram + ' ' + chuc_dv;
      }
    };

    const convert_block_two = (number) => {
      let dv = this.chuHangDonVi[number[1]];
      const chuc = this.chuHangChuc[number[0]];
      let append = '';

      // Nếu chữ số hàng đơn vị là 5
      if (number[0] > 0 && number[1] == 5) {
        dv = 'lăm';
      }

      // Nếu số hàng chục lớn hơn 1
      if (number[0] > 1) {
        append = ' mươi';

        if (number[1] == 1) {
          dv = ' mốt';
        }
      }

      return chuc + '' + append + ' ' + dv;
    };

    const to_vietnamese = (number) => {
      const str = `${number}`;
      const arr = [];
      let index = str.length;
      const result = [];

      if (index == 0 || str == 'NaN') {
        return '';
      }

      // Chia chuỗi số thành một mảng từng khối có 3 chữ số
      while (index >= 0) {
        arr.push(str.substring(index, Math.max(index - 3, 0)));
        index -= 3;
      }

      // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] != '' && arr[i] != '000') {
          result.push(convert_block_three(arr[i]));

          // Thêm đuôi của mỗi khối
          if (this.dvBlock[i]) {
            result.push(this.dvBlock[i]);
          }
        }
      }

      // Trả về kết quả kèm xóa những ký tự thừa
      return result.join(' ')
        .replace(/[0-9]/g, '')
        .replace(/ /g, ' ')
        .replace(/ $/, '');
    };
    return to_vietnamese(money);
  }
}
