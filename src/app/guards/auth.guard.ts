import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

export const AuthGuard: CanActivateFn = (route, state) => {
    const usuarioService = inject(UsuarioService);
    const router = inject(Router);

    if (usuarioService.estaLogado()) {
        const requiredRole = route.data['role'] as string | undefined;
        if (!requiredRole) {
            return true;
        }
        if (usuarioService.hasPermission(requiredRole)) {
            return true;
        }else {
            alert("Você não tem permissão!");
            router.navigate(['/home']);
            return false;
        }
    }
    alert('Você não está logado')
    router.navigate(['home']);
    return false;

}