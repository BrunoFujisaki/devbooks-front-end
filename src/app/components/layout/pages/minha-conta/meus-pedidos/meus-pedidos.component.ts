import { Component, OnInit, signal } from '@angular/core';
import { PedidoService } from '../../../../../services/pedido.service';
import { IPedido } from '../../../../../interfaces/ipedido';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meus-pedidos',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.css'
})
export class MeusPedidosComponent implements OnInit {
  modalAberto = signal(false);
  pedidos: IPedido[] = [];

  constructor(
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos.map(pedido => ({...pedido, modalAberto: false}));
    })
  }
}
