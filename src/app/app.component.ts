import { Component, OnInit } from '@angular/core';
import { CorteService } from './services/corte.service';
import { CorteModel } from './models/corte.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  cortesMostrables: CorteModel[] = [];

  constructor(private corteService: CorteService) { }

  ngOnInit() {
    this.corteService.buscarMostrablesAlPublico$()
        .subscribe((respuesta: CorteModel[]) => {
            this.cortesMostrables = respuesta;
        });
  }
  
}
