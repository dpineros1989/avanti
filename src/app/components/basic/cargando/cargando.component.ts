import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent implements OnInit {

  @Input() mostrar: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}