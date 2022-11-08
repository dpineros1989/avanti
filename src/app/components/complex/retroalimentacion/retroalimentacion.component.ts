import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { CargueSeguimientoModel } from '../../../models/cargue-seguimiento.model';
import { CargueService } from '../../../services/cargue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retroalimentacion',
  templateUrl: './retroalimentacion.component.html',
  styleUrls: ['./retroalimentacion.component.css']
})
export class RetroalimentacionComponent implements OnInit {

  @Input() cargue: CargueSeguimientoModel;
  formulario: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _cargueService: CargueService) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this._fb.group({
      retroalimentacion: ['', [Validators.required, Validators.minLength(5)]],
      aprobado         : [false],
      enviarCorreo     : [true]
    });
  }

  retroalimentar() {
    if (this.formulario.invalid) {
      return;
    }

    if (!this.formulario.value['aprobado']) {
      if (!this.formulario.value['enviarCorreo']) {
        this._cargueService.retroalimentar$(this.cargue.id, this.formulario.value['retroalimentacion'])
            .subscribe(respuesta => {
              console.log(respuesta);
              this._router.navigate(['/entidades']);
              Swal.fire({
                title        : 'Retroalimentación realizada',
                icon         : 'success'
              });
            }, error => {
              Swal.fire({
                title        : 'Ooops!',
                icon         : 'error'
              });
            });

      } else {
        this._cargueService.retroalimentarConCorreo$(this.cargue.id, this.formulario.value['retroalimentacion'])
            .subscribe(respuesta => {
              console.log(respuesta);
              this._router.navigate(['/entidades']);
              Swal.fire({
                title        : 'Retroalimentación realizada',
                icon         : 'success'
              });
            }, error => {
              Swal.fire({
                title        : 'Ooops!',
                icon         : 'error'
              });
            });

      }

    } else {
      if (!this.formulario.value['enviarCorreo']) {
        this._cargueService.aprobar$(this.cargue.id, this.formulario.value['retroalimentacion'])
            .subscribe(respuesta => {
              this._router.navigate(['/entidades']);
              Swal.fire({
                title        : 'Retroalimentación realizada',
                icon         : 'success'
              });
            }, error => {
              Swal.fire({
                title        : 'Ooops!',
                icon         : 'error'
              });
            });

      } else {
        this._cargueService.aprobarConCorreo$(this.cargue.id, this.formulario.value['retroalimentacion'])
            .subscribe(respuesta => {
              console.log(respuesta);
              this._router.navigate(['/entidades']);
              Swal.fire({
                title        : 'Retroalimentación realizada',
                icon         : 'success'
              });
            }, error => {
              Swal.fire({
                title        : 'Ooops!',
                icon         : 'error'
              });
            });

      }
      
    }
  }

}
