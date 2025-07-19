export interface Despesa {
    id?: number; // identificar a despesa
    nome: string;
    dataVencimento: string;
    valor: number;
    pago: boolean;
  }