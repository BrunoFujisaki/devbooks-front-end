import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from "../pages.component";
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, PagesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin = {
    email: '',
    senha: ''
  }

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  logar() {
    this.autenticacaoService.autenticar(this.formLogin).subscribe(() => {
      this.router.navigate(['home']);
      //tratar erro de login depois
    });
  }
}
