import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from '../../../../../interfaces/iusuario';
import { UsuarioService } from '../../../../../services/usuario.service';
import { ViaCepService } from '../../../../../services/via-cep.service';

@Component({
  selector: 'app-minha-conta',
  imports: [FormsModule],
  templateUrl: './editar-conta.component.html',
  styleUrl: './editar-conta.component.css'
})
export class EditarContaComponent implements OnInit {
  usuario: IUsuario | undefined;
  inputDesabilitado: boolean = true;
  formUsuario = {
    id: '',
    nome: '',
    email: '',
    telefone: ''
  }

  constructor(
    private userService: UsuarioService,
    private viaCepService: ViaCepService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.userService.getUsuario().subscribe(usuario => {
        this.usuario = usuario;
        if (this.usuario) {
          this.formUsuario.id = this.usuario.id;
          this.formUsuario.nome = this.usuario.nome;
          this.formUsuario.email = this.usuario.email;
          this.formUsuario.telefone = this.usuario.telefone;
        }
      })
  }

  salvar() {
    const usuarioAtualizado = {
      id: this.formUsuario.id,
      nome: this.formUsuario.nome,
      email: this.formUsuario.email,
      telefone: this.formUsuario.telefone,
      role: ''
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
