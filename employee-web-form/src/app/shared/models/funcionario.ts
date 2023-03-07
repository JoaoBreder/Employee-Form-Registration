export interface Funcionario {
  ativo: boolean;
  cpf: string;
  dataContratacao: string;
  email: string;
  endereco: object;
  foto: string;
  nome: string;
  uid: string | null | undefined;
}
