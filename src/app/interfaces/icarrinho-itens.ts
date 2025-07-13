import { ILivro } from "./ilivro";

export interface ICarrinhoItens {
    livro: ILivro,
    valor: number,
    quantidade: number
}
