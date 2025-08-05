import { Unidade } from './unidade.model';

export interface Propriedade {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  unidades: Unidade[];
}
