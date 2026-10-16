export interface Despensa {
  id: number;
  nome: string;
  descricao?: string | null;
  proprietarioId: number;
  criadoEm?: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string | null;
  despensaId: number;
  categoriaId?: number | null;
  unidade: string;
  estoqueMinimo: number;
}

export interface CriarDespensa {
  nome: string;
  descricao: string;
  proprietarioId: number;
}

export interface CriarProduto {
  nome: string;
  descricao: string;
  despensaId: number;
  categoriaId: number | null;
  unidade: string;
  estoqueMinimo: number;
}
