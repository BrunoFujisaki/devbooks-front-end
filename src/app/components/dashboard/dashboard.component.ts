import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../interfaces/iusuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  usuarioAtual: IUsuario | null = null;
  userSubscription: Subscription | undefined;

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.retornarUser().subscribe(usuario => {
      this.usuarioAtual = usuario;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/home'])
  }
}
