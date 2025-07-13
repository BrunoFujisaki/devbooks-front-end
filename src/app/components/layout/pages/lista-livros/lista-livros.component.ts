import { Component, OnInit } from '@angular/core';
import { ILivro } from '../../../../interfaces/ilivro';
import { LivroService } from '../../../../services/livro.service';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-lista-livros',
  imports: [CurrencyPipe],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css'
})
export class ListaLivrosComponent implements OnInit {
  livros!: ILivro[];

  constructor(
    private livroService: LivroService,
    private carrinhoService: CarrinhoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.livroService.getLivros().subscribe((livros) => {
      this.livros = livros
    });
  }

  adicionarAoCarrinho(livro: ILivro) {
    if (this.usuarioService.estaLogado()) {
      const dados = {
        livroId: livro.id,
        quantidade: 1
      }
      this.carrinhoService.adicionarAoCarrinho(dados).subscribe();
    } else {
      alert('Faça login para adicionar itens ao seu carrinho')
    }
  }
}
