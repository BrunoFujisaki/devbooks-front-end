import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { ICarrinho } from '../../../../interfaces/icarrinho';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ICarrinhoItens } from '../../../../interfaces/icarrinho-itens';
import { PedidoService } from '../../../../services/pedido.service';
import { IPedido } from '../../../../interfaces/ipedido';


@Component({
  selector: 'app-meu-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './meu-carrinho.component.html',
  styleUrl: './meu-carrinho.component.css'
})
export class MeuCarrinhoComponent implements OnInit {
  desabilitado: boolean = false;
  carrinho: ICarrinho = {
    id: '',
    usuarioId: '',
    itens: [],
    valorTotal: 0
  };
  pedido!: IPedido;

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carrinhoService.getItens().subscribe(carrinho => {
      this.carrinho = carrinho;
    })
  }
  //TRY CATCH PRA LANCAR ALERT VERIFICAR ISSO DEPOIS
  adicionarQuantidade(item: ICarrinhoItens) {
    this.carrinhoService.adicionarAoCarrinho(
      {
        livroId: item.livro.id,
        quantidade: 1
      }
    ).subscribe(() => {
      item.quantidade++;
      this.carrinho.valorTotal += item.valor;
    });
  }

  removerQuantidade(item: ICarrinhoItens) {
    this.carrinhoService.removerQuantidadeDoItem(
      {
        carrinhoId: this.carrinho.id,
        livroId: item.livro.id
      }
    ).subscribe(() => {
      item.quantidade--;
      this.carrinho.valorTotal -= item.valor;
    })
  }

  removerDoCarrinho(item: ICarrinhoItens) {
    this.carrinhoService.removerItemDoCarrinho(
      {
        carrinhoId: this.carrinho.id,
        livroId: item.livro.id
      }
    ).subscribe(() => {
      this.carrinho.itens = this.carrinho.itens.filter(i => i != item);
      this.carrinho.valorTotal = 0;
      this.carrinho.itens.forEach(i => {
        this.carrinho.valorTotal += i.valor * i.quantidade;
      })
    })
  }

  fecharPedido() {
    if (this.carrinho.itens.length == 0) {
      alert("Carrinho vazio");
    } else {
      this.router.navigate(['home/pagamento/', this.carrinho.id]);
    }
  }
}
