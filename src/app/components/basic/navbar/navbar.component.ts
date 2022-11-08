import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CorteModel } from '../../../models/corte.model';
import { VigenciaModel } from '../../../models/vigencia.model';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { VigenciaService } from 'src/app/services/vigencia.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    usuarioActual: Usuario;
    private _cortes: CorteModel[] = [];
    private _nombreVigenciaSeleccionada: string;
    vigencias: VigenciaModel[] = [];
    vigenciaParaRegistro: VigenciaModel;

    constructor(private router          : Router,
                private _authService    : AuthService,
                private _vigenciaService: VigenciaService) {
    }

    /**
     * Methods
     */
    ngOnInit() { 
        // Usuario autenticado
        this._authService.usuarioActual.subscribe(respuesta => {
            this.usuarioActual = respuesta;
            // TODO: Si es una entidad autenticada deberá buscar cual el corte activo de la vigencia actual para registrar información
            // Ver campo "actual" en vigencia.
        });

        // Vigencia actual para registrar seguimientos individuales
        this._vigenciaService.buscarVigenciaActual$().subscribe((vigencia: VigenciaModel) => {
            this.vigenciaParaRegistro = vigencia;
        }, (error) => {
            this.vigenciaParaRegistro = undefined;
        });
    }

    extraerVigenciasDeCortesMostrables() {
        if (this.cortes || this.cortes == null) {
            this.vigencias = [];
        }
        let vigencia: VigenciaModel;
        this.cortes.forEach((corte, key) => {
            if (key === 0) {
                vigencia = corte.vigencia;
                this.vigencias.push(corte.vigencia);
            } else {
                if (vigencia && vigencia.id !== corte.vigencia.id) {
                    vigencia = corte.vigencia;
                    this.vigencias.push(corte.vigencia);
                }
            }
        });
    }

    guardarVigencia(nombreVigencia: string) {
        this._nombreVigenciaSeleccionada = nombreVigencia;
    }

    login() {
        this.router.navigate(['/login']);
    }

    logout() {
        this._authService.logout();
        this.router.navigate(['/']);
    }


    /**
    * Getters and setters
    */
    @Input() set cortes(valor: CorteModel[]) {
        this._cortes = valor;
        this.extraerVigenciasDeCortesMostrables();
    }
    get cortes(): CorteModel[] {
        return this._cortes;
    }

    set nombreVigenciaSeleccionada(valor: string) {
        this._nombreVigenciaSeleccionada = valor;
    }
    get nombreVigenciaSeleccionada() {
        if (this._nombreVigenciaSeleccionada) {
            return this._nombreVigenciaSeleccionada;
        }
        if (this.vigencias.length > 0) {
            return this.vigencias[0].nombre.trim();
        }
        return new Date().getFullYear().toString();
    }

}