import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  usuarioAtual: IUsuario | null = null;
  private userSubscription: Subscription | undefined; // Propriedade para armazenar a inscrição

  constructor(
    private userService: UsuarioService
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
  signIn() {
    console.log(this.usuarioAtual)
  }
}
