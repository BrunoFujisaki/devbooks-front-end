import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainComponent } from "../main.component";
import { PedidoService } from '../../../../services/pedido.service';
import { IPedido } from '../../../../interfaces/ipedido';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, MainComponent, CurrencyPipe, DatePipe],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

  pedidos: IPedido[] = [];

  constructor(
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.pedidoService.getAllPedidos().subscribe(pedidos => {
      this.pedidos = pedidos.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    })
  }
}
