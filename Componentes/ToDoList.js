import {useNavigation} from '@react-navigation/native'
import { Button, FlatList, StyleSheet, View } from 'react-native';
import ToDoItem from './ToDoltem';

const TodoList = ({itens, trocaEstado, deleta}) => {
    const navigation = useNavigation();
    const navegaAddTarefa = () => {
        navigation.navigate('addTarefa');
    };
return (
    <View style={styles.container}>
        <FlatList
        data={itens}
        renderItem={({ item }) => (
            <ToDoItem item={item} trocaEstado={trocaEstado} deleta={deleta} />
        )}
            keyEstractor={item => item.id}
        />
            <Button title ="Adicionar Tarefa"   onPress={navegaAddTarefa}/>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgraundColor: '#fff'
    
    }

})

export default TodoList;