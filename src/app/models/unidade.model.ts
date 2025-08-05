export interface Unidade {
  id?: number; 
  tipo: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  descricao: string;
  alugado: boolean;
  valorAluguel: number | null;
  dataInicio: string;
  propriedade?: {
    id: number;
    nome?: string;
  };
}
