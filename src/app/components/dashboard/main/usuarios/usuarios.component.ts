import { Component, OnInit } from '@angular/core';
import { MainComponent } from "../main.component";
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuario } from '../../../../interfaces/iusuario';

@Component({
  selector: 'app-usuarios',
  imports: [MainComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: IUsuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }

}
