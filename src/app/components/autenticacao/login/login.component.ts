import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  token!: string;

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  logar() {
    this.authService.autenticar(this.email, this.senha).subscribe({
      next: (value) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log("Falha no login"); //MEXER DEPOIS
      }
    });

  }
}
