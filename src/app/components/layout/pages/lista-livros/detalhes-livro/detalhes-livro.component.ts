import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroService } from '../../../../../services/livro.service';
import { ILivro } from '../../../../../interfaces/ilivro';
import { CurrencyPipe } from '@angular/common';
import { UsuarioService } from '../../../../../services/usuario.service';
import { CarrinhoService } from '../../../../../services/carrinho.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'app-detalhes-livro',
  imports: [CurrencyPipe],
  templateUrl: './detalhes-livro.component.html',
  styleUrl: './detalhes-livro.component.css'
})
export class DetalhesLivroComponent implements OnInit {

  livro!: ILivro;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private carrinhoService: CarrinhoService,
    private alertaService: AlertaService,
    private livroService: LivroService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.livroService.getLivro(id).subscribe((livro) => {
        this.livro = livro;
      });
    }
  }

  adicionarAoCarrinho(livro: ILivro) {
    if (this.usuarioService.estaLogado()) {
      const dados = {
        livroId: livro.id,
        quantidade: 1
      }
      this.carrinhoService.adicionarAoCarrinho(dados).subscribe({
        next: () => {
          this.alertaService.success(livro.titulo+' adicionado ao carrinho!');
        },
        error: (erro) => {
          this.alertaService.error(erro.status, erro.error?.message)
        }
      });
    } else {
      alert('Faça login para adicionar itens ao seu carrinho')
    }
  }


}
