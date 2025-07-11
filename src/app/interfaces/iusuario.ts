import { IEndereco } from "./iendereco";

export interface IUsuario {
    id: string,
    nome: string,
    email: string,
    telefone: string,
    role: string,
    enderecoDTO: IEndereco | null
}
