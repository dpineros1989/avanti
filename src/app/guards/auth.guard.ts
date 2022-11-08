import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const usuario = this._authService.usuarioActualAsUsuario;
    if (usuario && usuario.roles && route.data.roles) {
        if (!route.data.roles.some(item => usuario.roles.includes(item))) {
            // El rol no se permite redireccionar a la página que intenta acceder
            this._router.navigate(['/']);
            return false;
        }
        // Rol autorizado
        return true;
        
    } else {
        this._router.navigateByUrl('/login');
        return false;
    }
  }
  
}
