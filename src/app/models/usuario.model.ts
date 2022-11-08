import { EntidadModel } from './entidad.model';


export class Usuario {
    username: string;
    roles   : string[];
    entidad?: EntidadModel;
    token?  : string;

    constructor(username: string, roles: string[], token: string, entidad: EntidadModel) {
        this.username = username;
        this.roles    = roles;
        this.token    = token;
        this.entidad  = entidad;
    }
}