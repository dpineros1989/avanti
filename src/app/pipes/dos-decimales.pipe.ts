import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'dosDecimales'
})
export class DosDecimalesPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(valor: number): number {
    if (!valor || valor == null) {
        return null;
    }
    return +this.decimalPipe.transform(valor, '1.2-2', 'en').replace(',', '');
  }

}
