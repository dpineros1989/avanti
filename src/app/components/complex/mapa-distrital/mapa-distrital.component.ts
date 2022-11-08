import { Component, OnInit, Input } from '@angular/core';
import { EntidadService } from '../../../services/entidad.service';
import { EntidadModel } from '../../../models/entidad.model';
import { Router } from '@angular/router';
import { CorteModel } from 'src/app/models/corte.model';

@Component({
  selector: 'app-mapa-distrital',
  templateUrl: './mapa-distrital.component.html',
  styleUrls: ['./mapa-distrital.component.css']
})
export class MapaDistritalComponent implements OnInit {

  private _corteSeleccionado: CorteModel;
  @Input() titulo: string = 'Entidades SDARIV';
  entidadesSdariv: EntidadModel[];
  entidades = {};

  constructor(private service: EntidadService,
              private router: Router) { }

  ngOnInit() {
    this.resetearEstados();
  }

  buscarEntidades() {
    if (!this.corteSeleccionado) {
      return;
    }

    this.service.buscarTodos$(this.corteSeleccionado.id).subscribe((respuesta: EntidadModel[]) => {
      this.entidadesSdariv = respuesta;
      this.entidadesSdariv.forEach(entidad => {
        if (entidad && entidad != null && entidad.sigla && entidad.sigla != null) {
          this.entidades[entidad.sigla.trim().toUpperCase()] = true;
        }
      });
    });
  }

  verEntidad(sigla: string) {
    // Buscar si existe la entidad y redireccionar a pagina de tablero de entidad
    const entidadesEncontradas: EntidadModel[] = this.entidadesSdariv.filter(entidad => {
      return entidad.sigla.trim().toUpperCase() === sigla;
    });
    
    if (!entidadesEncontradas || entidadesEncontradas == null || entidadesEncontradas.length === 0) {
      return;
    }
    this.router.navigate([
                          'entidad', 
                          this.corteSeleccionado.vigencia.nombre.trim(), 
                          entidadesEncontradas[0].sigla.trim().toLowerCase()
                        ]);
    
  }

  private resetearEstados() {
    // 1. Gestión Pública
    this.entidades['SECGEN'] = false;
    this.entidades['DADSC']  = false;

    // 2. Gobierno
    this.entidades['SDG']    = false;
    this.entidades['DADEP']  = false;
    this.entidades['UAEB']   = false;
    this.entidades['IDPAC']  = false;
    this.entidades['FOPAE']  = false;
    this.entidades['FVS']    = false;

    // 3. Hacienda
    this.entidades['SHD']     = false;
    this.entidades['UAEC']    = false;
    this.entidades['FONCEP']  = false;
    this.entidades['LOTERIA'] = false;

    // 4. Planeación
    this.entidades['SDP'] = false;

    // 5. Desarrollo Económico, Industria y Turismo
    this.entidades['SDDE']    = false;
    this.entidades['IPES']    = false;
    this.entidades['IDT']     = false;
    this.entidades['COOPROD'] = false;

    // 6. Educación
    this.entidades['SED']   = false;
    this.entidades['IDEP']  = false;
    this.entidades['UDFJC'] = false;

    // 7. Salud
    this.entidades['SDS']        = false;
    this.entidades['FFDS']       = false;
    this.entidades['HOSPITALES'] = false;
    this.entidades['CSALUD']     = false;
    
    // 8. Integración Social
    this.entidades['SDIS']    = false;
    this.entidades['IDIPRON'] = false;

    // 9. Cultura, Recreación y Deporte
    this.entidades['SCRD']     = false;
    this.entidades['IDRD']     = false;
    this.entidades['OFB']      = false;
    this.entidades['FGAAV']    = false;
    this.entidades['IDARTES']  = false;
    this.entidades['IDPC']     = false;
    this.entidades['CCAPITAL'] = false;

    // 10. Ambiente
    this.entidades['SDA']       = false;
    this.entidades['JBOTANICO'] = false;

    // 11. Movilidad
    this.entidades['SDM']          = false;
    this.entidades['IDU']          = false;
    this.entidades['UAERMV']       = false;
    this.entidades['TRANSMILENIO'] = false;
    this.entidades['TERMINAL']     = false;

    // 12. Habitat
    this.entidades['SDHT']          = false;
    this.entidades['CVP']           = false;
    this.entidades['UAESP']         = false;
    this.entidades['ERU']           = false;
    this.entidades['METROVIVIENDA'] = false;
    this.entidades['ETB']           = false;
    this.entidades['EEB']           = false;
    this.entidades['EAAB']          = false;

    // 13. Mujeres
    this.entidades['SDMujer'] = false;

    // 14. Seguridad y Convivencia
    this.entidades['SCJ'] = false;
  }

  /*
  * Getters and setters
  */
  @Input() set corteSeleccionado(valor: CorteModel) {
      this._corteSeleccionado = valor;
      this.buscarEntidades();
  }
  get corteSeleccionado(): CorteModel {
      return this._corteSeleccionado;
  }

}
