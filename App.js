import {StatusBar} from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Componentes/Header'
import TodoList from './Componentes/ToDoList'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaAddTarefa from './Componentes/addTarefa';


const Stack = createStackNavigator();
  export default function App() {
      const [Tarefas, setTarefas] = useState([ ]);
      const deleta= (tarefaId) => {
    setTarefas((tarefas) => {
      let novasTarefas = tarefas.filtar((item) => item.id !==tarefaId)
      return novasTarefas
    })
  }
  const trocaEstado = (tarefaId) => {
    setTarefas((tarefas) =>
    {
      let novasTarefas = tarefas.map((item) =>
      item.id === tarefaId ? { ...item, completado: !item.completado } : item)
      return novasTarefas
    })
  }
  const adicionaTarefa = (tarefa) =>{
    setTarefas((Tarefas) => [
      ...Tarefas,
      { id: Date.now(), nome: tarefa.nome, descricao:tarefa.descricao, data: tarefa.data, completed: false },
      //{ id: Date.now(), text: text, completed: false },
    ]);
  };
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" ontions={{ headerShown: false }}>
      {() => (
    <View style={styles.container}>
      <Header />
      <TodoList itens={Tarefas} trocaEstado={trocaEstado} deleta={deleta} />
      <StatusBar Style="auto" />
    </View>
    )}
    </Stack.Screen>
    <Stack.Screen
      options={{ headerShown: false}}
      name="addTarefa"
      component={TelaAddTarefa}
      initialParams={{ addTarefa: adicionaTarefa }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


