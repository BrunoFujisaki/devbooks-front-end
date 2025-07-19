import { IEndereco } from "./iendereco";
import { ILivro } from "./ilivro";
import { IUsuario } from "./iusuario";

export interface IPedido {
    id: string,
    usuario: IUsuario,
    data: Date,
    status: string,
    valorTotal: number,
    endereco: IEndereco;
    itens: IPedidoItens[];
}

export interface IPedidoItens {
    livro: ILivro,
    valor: number,
    quantidade: number
}
