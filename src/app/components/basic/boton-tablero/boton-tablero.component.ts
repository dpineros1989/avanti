import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-tablero',
  templateUrl: './boton-tablero.component.html',
  styleUrls: ['./boton-tablero.component.css']
})
export class BotonTableroComponent implements OnInit {

  @Input() icono         = 'cube';
  @Input() valor         = 0;
  private _titulo        = null;
  private _subtitulo     = null;
  private _ruta: string[]= [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Methods
   */
  verDetalle() {
      if (!this.ruta || this.ruta.length === 0) {
          return;
      }
      this.router.navigate(this.ruta);
  }

  /**
  * Getters and setters
  */
  @Input() set ruta(valor: string[]) {
      this._ruta = valor;
  }
  get ruta(): string[] {
      return this._ruta;
  }

  @Input() set titulo(valor: string) {
    this._titulo = valor;
  }
  get titulo(): string {
     return this._titulo != null && this._titulo != '' ? this._titulo : '&nbsp;'
  }
  
  @Input() set subtitulo(valor: string) {
    this._subtitulo = valor;
  }
  get subtitulo(): string {
     return this._subtitulo != null && this._subtitulo != '' ? this._subtitulo : '&nbsp;'
  }

}