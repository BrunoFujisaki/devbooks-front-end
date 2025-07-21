import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CadastroService } from '../../../../services/cadastro.service';
import { ViaCepService } from '../../../../services/via-cep.service';
import { AlertaService } from '../../../../services/alerta.service';

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
    confirmarSenha: '',
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
    private alertaService: AlertaService,
    private router: Router
  ) {}

  cadastrar() {
    if (this.formRegistro.senha != this.formRegistro.confirmarSenha) {
      this.alertaService.error('Senhas não coincidem', '');
    } else {
      this.cadastroService.cadastrarUsuario(this.formRegistro).subscribe({
        next: () => {
          this.router.navigate(['home/login']);
        },
        error: (erro) => {
          this.alertaService.error(erro.status, erro.error.message)
        }
      });
    }
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
