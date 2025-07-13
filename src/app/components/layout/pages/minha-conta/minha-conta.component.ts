import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuario } from '../../../../interfaces/iusuario';
import { FormsModule } from '@angular/forms';
import { ViaCepService } from '../../../../services/via-cep.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-minha-conta',
  imports: [FormsModule],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent implements OnInit {
  usuario!: IUsuario;
  inputDesabilitado: boolean = true;
  formUsuario = {
    id: '',
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  }

  constructor(
    private userService: UsuarioService,
    private viaCepService: ViaCepService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUsuario(id).subscribe(usuario => {
        this.usuario = usuario;
        console.log(this.usuario);
        if (this.usuario) {
          this.formUsuario.id = this.usuario.id;
          this.formUsuario.nome = this.usuario.nome;
          this.formUsuario.email = this.usuario.email;
          this.formUsuario.telefone = this.usuario.telefone;
          if (this.usuario.endereco) {
            this.formUsuario.cep = this.usuario.endereco.cep;
            this.formUsuario.rua = this.usuario.endereco.logradouro;
            this.formUsuario.numero = this.usuario.endereco.numero;
            this.formUsuario.complemento = this.usuario.endereco.complemento;
            this.formUsuario.bairro = this.usuario.endereco.bairro;
            this.formUsuario.cidade = this.usuario.endereco.localidade;
            this.formUsuario.uf = this.usuario.endereco.uf;
          }
        }
      })
    }
    
  }

  buscarEnderecoPorCep() {
    if (this.formUsuario.cep.length === 8) {
      this.viaCepService.getEndereco(this.formUsuario.cep).subscribe((endereco) => {
        this.formUsuario.rua = endereco.logradouro;
        this.formUsuario.numero = endereco.numero;
        this.formUsuario.complemento = endereco.complemento;
        this.formUsuario.bairro = endereco.bairro;
        this.formUsuario.cidade = endereco.localidade;
        this.formUsuario.uf = endereco.uf;
      });
    }
  }

  salvar() {
    const usuarioAtualizado = {
      id: this.formUsuario.id,
      nome: this.formUsuario.nome,
      email: this.formUsuario.email,
      telefone: this.formUsuario.telefone,
      role: 'USER',
      endereco: {
        cep: this.formUsuario.cep,
        logradouro: this.formUsuario.rua,
        numero: this.formUsuario.numero,
        complemento: this.formUsuario.complemento,
        bairro: this.formUsuario.bairro,
        localidade: this.formUsuario.cidade,
        uf: this.formUsuario.uf
      }
    }
    console.log(usuarioAtualizado);
    this.userService.putUsuario(usuarioAtualizado).subscribe(() => {
      this.router.navigate(['home']);
    })
  }

  editar() {
    this.inputDesabilitado = !this.inputDesabilitado;
  }

}
