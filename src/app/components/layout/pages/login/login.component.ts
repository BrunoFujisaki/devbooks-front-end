import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
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
    private alertaService: AlertaService,
    private router: Router
  ) {}

  logar() {
    this.autenticacaoService.autenticar(this.formLogin).subscribe({
      next: () => {
        this.router.navigate(['home/livros']);
      },
      error: (erro) => {
        this.alertaService.error(erro.status, erro.error.message);
      }
    });
  }
}
