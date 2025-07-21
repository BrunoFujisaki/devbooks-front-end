import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PedidoService } from '../../../../services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViaCepService } from '../../../../services/via-cep.service';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { ICarrinho } from '../../../../interfaces/icarrinho';
import Swal from 'sweetalert2';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-pagamento',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent implements OnInit {
  carrinho: ICarrinho = {
    id: '',
    usuarioId: '',
    valorTotal: 0,
    itens: []
  };

  formPagamento = {
    numeroCartao: '',
    nomeCartao: '',
    dataValidade: '',
    cvv: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  }

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private alertaService: AlertaService,
    private activatedRoute: ActivatedRoute,
    private viaCepService: ViaCepService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.carrinhoService.getCarrinho(id).subscribe(carrinho => {
        this.carrinho = carrinho;
      })
    }

  }

  buscarEnderecoPorCep() {
    if (this.formPagamento.cep.length === 8) {
      this.viaCepService.getEndereco(this.formPagamento.cep).subscribe((endereco) => {
        this.formPagamento.rua = endereco.logradouro;
        this.formPagamento.numero = endereco.numero;
        this.formPagamento.complemento = endereco.complemento;
        this.formPagamento.bairro = endereco.bairro;
        this.formPagamento.cidade = endereco.localidade;
        this.formPagamento.uf = endereco.uf;
      });
    }
  }

  pagarPedido(id: string) {
    const endereco = {
      cep: this.formPagamento.cep,
      logradouro: this.formPagamento.rua,
      numero: this.formPagamento.numero,
      complemento: this.formPagamento.complemento,
      bairro: this.formPagamento.bairro,
      localidade: this.formPagamento.cidade,
      uf: this.formPagamento.uf
    }
    this.pedidoService.fazerPedido(endereco).subscribe({
      next: async () => {
        await this.alertaService.success('Pedido realizado com sucesso');
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        this.alertaService.error(erro.status, erro.error?.message)
      }
    });
  }
}
