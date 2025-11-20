import React from 'react';
import { View, Text } from 'react-native';
import { formatCurrency, formatDate } from '../utils/formatter';

interface ItemDespesaProps {
  descricao: string;
  valor: number;
  categoriaNome?: string | null;
  data: any;
}

export default function ItemDespesa({
  descricao,
  valor,
  categoriaNome,
  data
}: ItemDespesaProps) {
  return (
    <View className="bg-white p-4 rounded-lg flex-row justify-between items-center mb-3 shadow-sm elevation-2">
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800">
          {descricao}
        </Text>

        <Text className="text-sm text-gray-500 mt-1">
          {categoriaNome ?? 'Sem Categoria'}
        </Text>

        <Text className="text-xs text-gray-400 mt-1">
          {formatDate(data)}
        </Text>
      </View>

      <Text className="text-base font-bold text-red-600">
        {formatCurrency(valor)}
      </Text>
    </View>
  );
}
