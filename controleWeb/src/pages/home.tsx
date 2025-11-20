import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, SafeAreaView, FlatList, TouchableOpacity,
  ActivityIndicator, Alert, StatusBar, Modal,
  TextInput, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import {ApiService} from '../services/apiService';
import ItemDespesa from '../components/itemDespesa';
import { formatCurrency } from '../utils/formatter';
import { Despesa, Categoria, DespesaDTO } from '../types/types';

export default function Home() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaIdSelecionado, setCategoriaIdSelecionado] = useState<number | null>(null);
  const [data, setData] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [cats, desps] = await Promise.all([
        ApiService.getCategorias(),
        ApiService.getDespesas()
      ]);
      setCategorias(cats);
      setDespesas(desps);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar dados da API: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const salvarDespesa = async () => {
    if (!descricao || !valor || !categoriaIdSelecionado || !data) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    const payload: DespesaDTO = {
      descricao,
      valor: parseFloat(valor.replace(',', '.')),
      data,
      categoriaId: categoriaIdSelecionado
    };

    try {
      await ApiService.salvarDespesa(payload);
      await carregarDados();
      setModalVisivel(false);
      limparFormulario();
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro desconhecido");
    }
  };

  const limparFormulario = () => {
    setDescricao('');
    setValor('');
    setCategoriaIdSelecionado(null);
    setData('');
  };

  const totalGasto = useMemo(() => {
    return despesas.reduce((acc, item) => acc + item.valor, 0);
  }, [despesas]);

  return (
    <SafeAreaView className="flex-1 bg-[#f4f7f6]">
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      <View className="bg-[#2c3e50] p-5 items-center shadow-md">
        <Text className="text-white text-xl font-bold">Rastreador Despesas</Text>
      </View>

      <View className="bg-white p-5 mx-4 my-4 rounded-xl items-center shadow-sm elevation-3">
        <Text className="text-base text-gray-500">Total Gasto</Text>
        <Text className="text-3xl font-bold text-[#2c3e50] mt-2">
          {formatCurrency(totalGasto)}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2980b9" className="mt-5" />
      ) : (
        <FlatList
          data={despesas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemDespesa
              descricao={item.descricao}
              valor={item.valor}
              categoriaNome={item.categoria?.categoria}
              data={item.data}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}
          onRefresh={carregarDados}
          refreshing={loading}
        />
      )}

      <TouchableOpacity 
        className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-[#2980b9] justify-center items-center shadow-lg elevation-5"
        onPress={() => setModalVisivel(true)}
      >
        <Text className="text-white text-3xl pb-1">+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
         <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            className="flex-1 bg-black/50 justify-end"
         >
          <View className="bg-white p-6 rounded-t-3xl max-h-[80%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-xl font-bold text-center mb-6 text-gray-800">
                Nova Despesa
              </Text>
              
              <Text className="text-gray-600 mb-1 ml-1">Valor</Text>
              <TextInput 
                className="bg-gray-100 p-3 rounded-lg mb-4 text-gray-800"
                keyboardType="numeric" 
                value={valor} 
                onChangeText={setValor} 
                placeholder="0.00" 
              />

              <Text className="text-gray-600 mb-1 ml-1">Descrição</Text>
              <TextInput 
                className="bg-gray-100 p-3 rounded-lg mb-4 text-gray-800"
                value={descricao} 
                onChangeText={setDescricao} 
                placeholder="Ex: Almoço" 
              />

              <Text className="text-gray-600 mb-1 ml-1">Categoria</Text>
              <View className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
                <Picker
                    selectedValue={categoriaIdSelecionado}
                    onValueChange={(itemValue: any) => setCategoriaIdSelecionado(itemValue)}
                >
                    <Picker.Item label="Selecione..." value={null} color="#999" />
                    {categorias.map(c => <Picker.Item key={c.id} label={c.categoria} value={c.id} />)}
                </Picker>
              </View>

              <Text className="text-gray-600 mb-1 ml-1">Data (AAAA-MM-DD)</Text>
              <TextInput 
                className="bg-gray-100 p-3 rounded-lg mb-6 text-gray-800"
                value={data} 
                onChangeText={setData} 
                placeholder="2025-01-01" 
              />

              <View className="flex-row gap-3 mt-2">
                <TouchableOpacity 
                    onPress={() => setModalVisivel(false)} 
                    className="flex-1 bg-gray-300 p-4 rounded-lg items-center"
                >
                    <Text className="font-bold text-gray-700">Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={salvarDespesa} 
                    className="flex-1 bg-[#2980b9] p-4 rounded-lg items-center"
                >
                    <Text className="font-bold text-white">Salvar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}