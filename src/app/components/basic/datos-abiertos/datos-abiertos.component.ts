import { Component, OnInit, Input } from '@angular/core';
import { DatoAbiertoModel } from 'src/app/models/dato-abierto.model';

@Component({
  selector: 'app-datos-abiertos',
  templateUrl: './datos-abiertos.component.html',
  styleUrls: ['./datos-abiertos.component.css']
})
export class DatosAbiertosComponent implements OnInit {

  @Input() datos   : DatoAbiertoModel[] = [];
  // @Input() tamanio : string = 'normal';

  constructor() { }

  ngOnInit() {
  }

}
