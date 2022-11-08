import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorteService } from '../../services/corte.service';
import { CorteModel } from '../../models/corte.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    corteSeleccionado: CorteModel;
  
    constructor(private route: ActivatedRoute,
                private corteService: CorteService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const vigencia = params["vigencia"];
            // En caso que venga un parametro de vigencia, se toma el primer corte que aparezca
            // como mostrable al público. En caso contrario, toma el el último corte mostrable
            // al público en la vigencia seleccionada.
            if (vigencia) {
                this.corteService.buscarMostrablesAlPublico$().subscribe((respuesta: CorteModel[]) => {
                    this.corteSeleccionado = respuesta.find(item => {
                        return vigencia === item.vigencia.nombre.trim();
                    });
                });
            } else {
                this.corteService.buscarMostrablesAlPublico$().subscribe((respuesta: CorteModel[]) => {
                    if (!respuesta) {
                        console.log("No hay cortes mostrables al público!");
                    }
                    this.corteSeleccionado = respuesta[0];
                });
            }
            
        });
    }

    /*
    * Methods
    */
}
