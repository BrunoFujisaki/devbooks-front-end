import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../../services/registro.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formRegistro = {
    nome: '',
    email: '',
    senha: ''
  }

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {}

  registrar() {
    const usuario = {
      ...this.formRegistro
    }
    this.registroService.registrarUsuario(usuario).subscribe(() => {
      this.router.navigate(['/autenticacao/login']);
    });
  }
}
