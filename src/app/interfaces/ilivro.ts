import { ICategoria } from "./icategoria";

export interface ILivro {
    id: string,
    titulo: string,
    autor: string,
    categoria: ICategoria,
    descricao: string,
    estoque: number,
    valor: number,
    imagem: string
}
