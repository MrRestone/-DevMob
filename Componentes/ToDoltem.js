import React, {useState,useRef, useEffect} from 'react';
import{ Animated, View, Text, TouchableOpacity, StyleSheet, Switch, UIManager, LayoutAnimation,Platform } from 'react-native';

if (Platform.OS === 'android'){
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToDoItem = ({item, trocaEstado, deleta }) => {
    const[isExpanded, SetIsExpanded] = useState(false);
    const animationValue = useRef(new Animated.Value(0)).current
    const pan = wseRef(new Animated.ValueXY()).current;

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x}],
                                 {useNativeDriver: false}),
        onPanresponderRelease: (_, gestureState) => {
            if (gestureState.dx < -200) {
                deleta(item.id)
            }
            else {
                Animated.spring(
                    pan,
                    {toValeu: {x: 0, y:0},
                    useNativeDriver: false},
                ).start()
                
            }

        },            
    })).current
    const expand = () =>{
        LayoutAnimation.spring()
        SetIsExpanded(!isExpanded)
    }

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: item.completado ? 0.25 : 1, //Adjust opacity as needed
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [item.completado])

    return(
    <View style={styles.container}>   
     <View style={styles.todoItem}>
            <Switch
                value={item.completado}
                onValueChange={() =>trocaEstado(item.id)}
        />
        <TouchableOpacity onPress={expand}>
         <Text style={item.completado ? styles.completedText : styles.text}>
            {item.nome}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleta(item.id)}>
            <Text style={styles.deleteButton}>Excluir</Text>
        </TouchableOpacity>
     </View>
     {isExpanded &&(
        <View>
            <Text Style={styles.text}><Text style={{fontWeight: 'bold'}}>&#8226; Date:</Text>{item.tarefa.date.toLocaleString().split(' ')[0]}</Text>
            <Text Style={styles.text}><Text style={{fontWeight: 'bold'}}>&#8226; Descrição: </Text> {item.tarefa.descricao}</Text>
        </View> 
     )}
    </View> 
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        backgrundColor: '#ededed',
        borderBottomWidth: 1,
        BorderBottomColor: '#ccc'
    },
    todoItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: 1,
        borderBottomColor: '#fff'
    },
    text: {
        fontSize: 18,
    },
    completedText:{
        fontsize: 18,
        textDecorationLine: 'line-through',
        color:'#ccc'
    },
    deleteButton: {
        color: 'red',
        fontSize: 18,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center'
    },
});

export default ToDoItem