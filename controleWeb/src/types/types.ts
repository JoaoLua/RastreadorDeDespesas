export interface Categoria {
  categoria: string | undefined;
  id: number;
}

export interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria?: Categoria | null;
}

export interface DespesaDTO {
  descricao: string;
  valor: number;
  data: string;
  categoriaId: number | null;
}