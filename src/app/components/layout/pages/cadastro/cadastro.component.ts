import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CadastroService } from '../../../../services/cadastro.service';
import { ViaCepService } from '../../../../services/via-cep.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  formRegistro = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  }

  constructor(
    private cadastroService: CadastroService,
    private viaCepService: ViaCepService,
    private router: Router
  ) {}

  cadastrar() {
    this.cadastroService.cadastrarUsuario(this.formRegistro).subscribe(() => {
      this.router.navigate(['home/login']);
    }) 
  }

  buscarEnderecoPorCep() {
    if (this.formRegistro.cep.length === 8) {
      this.viaCepService.getEndereco(this.formRegistro.cep).subscribe((endereco) => {
        this.formRegistro.rua = endereco.logradouro;
        this.formRegistro.numero = endereco.numero;
        this.formRegistro.complemento = endereco.complemento;
        this.formRegistro.bairro = endereco.bairro;
        this.formRegistro.cidade = endereco.localidade;
        this.formRegistro.uf = endereco.uf;
      });
    }
  }
}
