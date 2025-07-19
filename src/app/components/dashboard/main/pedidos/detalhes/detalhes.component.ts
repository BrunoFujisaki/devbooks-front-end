import { Component, OnInit } from '@angular/core';
import { MainComponent } from "../../main.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidoService } from '../../../../../services/pedido.service';
import { IPedido } from '../../../../../interfaces/ipedido';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  imports: [MainComponent, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {
  pedido!: IPedido;

  constructor(
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pedidoService.getPedido(id).subscribe(pedido => {
        this.pedido = pedido;
      })
    }
  }
}
