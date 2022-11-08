import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'etiqueta'
})
export class EtiquetaPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(valor: number, divididoMillones = false): string {

    switch (valor) {
        case -1: return 'Por demanda';
        case -2: return 'No aplica';
        case -3: return 'Según convenios disponibles';
        default: 
            if (divididoMillones) {
                if (this.tieneDecimales(valor / 1000000)) {
                    return `${this.decimalPipe.transform(valor / 1000000, '1.2-2', 'es-CO')} millones`;
                } else {
                  return `${this.decimalPipe.transform(valor / 1000000, '1.0', 'es-CO')} millones`;
                }

            } else {
              if (this.tieneDecimales(valor)) {
                  return `${this.decimalPipe.transform(valor, '1.2-2', 'es-CO')}`;
              } else {
                return `${this.decimalPipe.transform(valor, '1.0', 'es-CO')}`;
              }
            }
    }
  }

  private tieneDecimales(valor: number) {
    return valor - Math.floor(valor) > 0;
  }

}
