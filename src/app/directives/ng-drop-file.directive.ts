import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

  @Input() items: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    const transferencia = this._getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer: event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( listaArchivos: FileList) {
    // Como la intención es mostrar solo el primer archivo, en este punto limpio la lista de archivos,
    // para reemplazarla con los nuevos archivos que suelten en el componente Drag and drop.
    // Posteriormente en el html solo muestro el primer archivo de la lista
    this.items.splice(0, this.items.length);
    for (const propiedad in Object.getOwnPropertyNames(listaArchivos)) {
      const archivoTemporal = listaArchivos[propiedad];
      if (this._archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.items.push(nuevoArchivo);
      }
    }
    // console.log(this.items);
  }

  // Validaciones
  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (!this._archivoCargadoPreviamente(archivo.name) && this._esArchivoExcel(archivo)) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoCargadoPreviamente( nombreArchivo: string ): boolean {
    for (const item of this.items ) {
      if (item.nombreArchivo === nombreArchivo) {
        console.log('El archivo' + nombreArchivo + ' ya fue agregado previamente');
        return true;
      }
    }
    return false;
  }

  private _esArchivoExcel( archivo: File ): boolean {
    if (!archivo) {
      return false;
    }
    return archivo.name.toLowerCase().endsWith('.xlsx') || archivo.type.toLowerCase().includes('xlsx');
  }

  private _esImagen( tipoArchivo: string ): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
