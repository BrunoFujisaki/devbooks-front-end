import { Component } from '@angular/core';
import { PagesComponent } from "../pages.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CadastroService } from '../../../../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  imports: [PagesComponent, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  formRegistro = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
  }

  constructor(
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  cadastrar() {
    this.cadastroService.cadastrarUsuario(this.formRegistro).subscribe(() => {
      this.router.navigate(['home/login']);
    }) 
  }
}
