import { ICarrinhoItens } from "./icarrinho-itens";

export interface ICarrinho {
    id: string,
    usuarioId: string,
    valorTotal: number,
    itens: ICarrinhoItens[];
}
