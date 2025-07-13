import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { ICarrinho } from '../../../../interfaces/icarrinho';
import { IUsuario } from '../../../../interfaces/iusuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { CurrencyPipe } from '@angular/common';
import { ICarrinhoItens } from '../../../../interfaces/icarrinho-itens';


@Component({
  selector: 'app-meu-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './meu-carrinho.component.html',
  styleUrl: './meu-carrinho.component.css'
})
export class MeuCarrinhoComponent implements OnInit {
  usuario!: IUsuario;
  desabilitado: boolean = false;
  carrinho: ICarrinho = {
    id: '',
    usuarioId: '',
    itens: [],
    valorTotal: 0
  };

  constructor(
    private usuarioService: UsuarioService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.getUsuario(id).subscribe(usuario => {
        this.usuario = usuario;
        this.carrinhoService.getItens(this.usuario.id).subscribe(carrinho => {
          this.carrinho = carrinho;
        })
      })
    }

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
      this.carrinho.itens = this.carrinho.itens.filter(i => i!=item);
      this.carrinho.valorTotal = 0;
      this.carrinho.itens.forEach(i => {
        this.carrinho.valorTotal += i.valor * i.quantidade;
      })
    })
  }
}
