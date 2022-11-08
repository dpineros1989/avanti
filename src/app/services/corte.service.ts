import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorteService {

  private URL = `${environment.apiUrl}/cortes`;

  constructor(private http: HttpClient) { }

  buscarTodos$(vigenciaId: number) {
    return this.http.get(`${this.URL}/vigencia/${vigenciaId}`);
  }

  buscar$(id: number) {
    return this.http.get(`${this.URL}/${id}`);
  }

  buscarMostrablesAlPublico$() {
    return this.http.get(`${this.URL}/mostrables`);
  }

  buscarUltimoCorteActivo$() {
    return this.http.get(`${this.URL}/ultimo-activo`);
  }
}
