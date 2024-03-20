import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Platform } from 'react-native';
import Header from "../Componentes/Header";
import Datetimepicker from '@react-native-community/datetimepicker';

const TelaAddTarefa = ({navigation, route }) => {
    const [tarefa, setTarefa ] = useState({nome:'', descricao: '',data : new Date(Date.now())});
    const [showDatePicker, setShowdatePicker] = useState(false)

    const adicionaTarefa = () => {
        route.params.addTarefa(tarefa);
        setTarefa({nome: '', descricao: '', data: new Date(Date.now())});
        navigation.goBack();
    };

    const saveDate = (event, value) => {
        setTarefa({...tarefa, data: value});
        if (Platform.OS === 'android'){
            setShowdatePicker(false);
        }
    }
    return(
        <View style={styles.container}>
            <Header />
            <TextInput
            style={styles.input}
            placeholder="Nova Tarefa"
            value={tarefa.nome}
            onChangeText={(value )=> setTarefa({... tarefa, nome: value})}
            />
            <TextInput
            style={[styles.input, styles.description]}
            placeholder="Descrição"
            multiline={true}
            value={tarefa.descricao}
            onChangeText={(value) => setTarefa({...tarefa, descricao: value})}
            />
            {showDatePicker &&(
                <Datetimepicker
                    value={tarefa.data}
                    display={Platform.OS === 'ios' ? 'spinner' : 'defaukt'}
                    onChange={saveDate}
                    Style={styles.dataPicker}
                />
            )}
            <Button title="Salvar" onPress={adicionaTarefa} />
        </View>
    );
};
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        bockgroundColor: '#fff',
    },
    description:{
        height:120
    },
    input:{
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    },
    dateButton:{
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
 });

 export default TelaAddTarefa;