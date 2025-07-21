import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { ICarrinho } from '../../../../interfaces/icarrinho';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ICarrinhoItens } from '../../../../interfaces/icarrinho-itens';
import { IPedido } from '../../../../interfaces/ipedido';
import { AlertaService } from '../../../../services/alerta.service';


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
    private alertaService: AlertaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carrinhoService.getItens().subscribe(carrinho => {
      this.carrinho = carrinho;
    })
  }
  
  adicionarQuantidade(item: ICarrinhoItens) {
    this.carrinhoService.adicionarAoCarrinho(
      {
        livroId: item.livro.id,
        quantidade: 1
      }
    ).subscribe({
      next: () => {
        item.quantidade++;
        this.carrinho.valorTotal += item.valor;
      },
      error: (erro) => {
        this.alertaService.error(erro.status, erro.error.message);
      }
    });
  }

  removerQuantidade(item: ICarrinhoItens) {
    this.carrinhoService.removerQuantidadeDoItem(
      {
        carrinhoId: this.carrinho.id,
        livroId: item.livro.id
      }
    ).subscribe({
      next: () => {
        item.quantidade--;
        this.carrinho.valorTotal -= item.valor;
      },
      error: (erro) => {
        this.alertaService.error(erro.status, erro.error.message);
      }
    })
  }

  removerDoCarrinho(item: ICarrinhoItens) {
    this.carrinhoService.removerItemDoCarrinho(
      {
        carrinhoId: this.carrinho.id,
        livroId: item.livro.id
      }
    ).subscribe({
      next: () => {
        this.carrinho.itens = this.carrinho.itens.filter(i => i != item);
        this.carrinho.valorTotal = 0;
        this.carrinho.itens.forEach(i => {
          this.carrinho.valorTotal += i.valor * i.quantidade;
        })
      },
      error: (erro) => {
        this.alertaService.error(erro.status, erro.error.message);
      }
    })
  }

  fecharPedido() {
    if (this.carrinho.itens.length == 0) {
      this.alertaService.error('Carrinho vazio!', 'Para continuar, selecione ao menos um item.')
    } else {
      this.router.navigate(['home/pagamento/', this.carrinho.id]);
    }
  }
}
