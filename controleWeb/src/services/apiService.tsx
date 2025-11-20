import { Categoria, Despesa, DespesaDTO } from "../types/types";

const API_BASE_URL = "http://192.168.1.6:5062/api"; // antes de rodar o app verifique o IP da maquina para que rode em um celular android fora do computador local

export const ApiService = {
getCategorias: async (): Promise<Categoria[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`);
      if (!response.ok) {
        const textoErro = await response.text(); 
        throw new Error(`Erro ${response.status}: ${textoErro}`);
      }
      const dados = await response.json();
      return dados;

    } catch (error) {
      throw error;
    }
  },
  getDespesas: async (): Promise<Despesa[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/despesas`);
      if (!response.ok) throw new Error("Falha ao buscar despesas");
      return await response.json();
    } catch (error) {
      console.error("Erro no ApiService.getDespesas:", error);
      throw error;
    }
  },

  salvarDespesa: async (despesaPayload: DespesaDTO): Promise<Despesa> => {
    try {
      const response = await fetch(`${API_BASE_URL}/despesas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(despesaPayload),
      });

      if (!response.ok) {
        const erroTexto = await response.text();
        throw new Error(erroTexto || "Erro desconhecido ao salvar");
      }

      return await response.json();
    } catch (error) {
        console.error("Erro no ApiService.salvarDespesa:", error);
        throw error;
    }
  },
};
