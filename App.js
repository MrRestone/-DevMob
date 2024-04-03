import {StatusBar} from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Componentes/Header'
import TodoList from './Componentes/ToDoList'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaAddTarefa from './Componentes/addTarefa';
import TelaLogin from './Componentes/login';
import TelaAddUser from './Componentes/addUser';
import firebase from './servicos/firebase'
import {getDatabase, ref, get, update, set, remove } from "firebase/database"

const Stack = createStackNavigator();
  export default function App() {
      const [Tarefas, setTarefas] = useState([ ]);
      const deleta= (tarefaId) => {
    setTarefas((tarefas) => {
      let novasTarefas = tarefas.filter((item) => item.id !==tarefaId)
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
    const database = getDatabase(firebase);
    var id = Date.now().toString()
    const tarefaRef = ref(database, 'tarefas/'+ id);
    set(tarefaRef, {tarefa: {...tarefa, data: tarefa.data.toString()}, completado: false })
    .then(() =>{
      setTarefas((Tarefas) => [
        ...Tarefas,
        {id: id, tarefa: tarefa, completado: false},
      ])
      console.log("Tarefa adicionada com sucesso.");
    })
    .catch((error) => {
      console.error("erro ao adicionar tarefa:", error);
    })
    setTarefas((Tarefas) => [
      ...Tarefas,
      { id: Date.now(), nome: tarefa.nome, descricao:tarefa.descricao, data: tarefa.data, completed: false },
      //{ id: Date.now(), text: text, completed: false },
    ]);
  };
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName ='Login'>
    <Stack.Screen
     options={{ headerShown: false}}
     name="Login"
     component={TelaLogin}
     />
    <Stack.Screen name="Home" options={{ headerShown: false }}>
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
    name="addUser"
    component={TelaAddUser}
    />
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


