import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuario } from '../../../../interfaces/iusuario';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EstatisticasService, IEstatisticas } from '../../../../services/estatisticas.service';

@Component({
  selector: 'app-tela-inicial',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css'
})
export class TelaInicialComponent implements OnInit {

  usuario: IUsuario | undefined;
  estatisticas: IEstatisticas | undefined;
  data: Date =  new Date();
  intervalo: any;

  constructor(
    private usuarioService: UsuarioService,
    private estatisticasService: EstatisticasService
  ) {}

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.data = new Date();
    }, 1000);
    
    this.usuarioService.getUsuario().subscribe(usuario => {
      this.usuario = usuario;
    })

    this.estatisticasService.getEstatisticas().subscribe(stats => {
      this.estatisticas = stats;
    })
  }
}
