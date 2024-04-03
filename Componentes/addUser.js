import react, {useState} from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import firebase from '../Serviços/firebase'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

function TelaAddUser({navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [createFailed, setCreateFailed] = useState(false)

    const registrar = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log('Usuário criado com sucesso:', userCredential.user.email);
            setCreateFailed(false)
            navigation.navigate('Login')
        })
        .catch((error) => {
            console.error('Erro ao criar usuário:', error.menssage)
            serCreatefailed(true)
        })
    };
    return(
        <View style={StyleSheet.container}>
            {createFailed && <Text style={StyleSheet.createFailed}>Falha ao criar Usuário.</Text>}
            <TextInput
                placeholder="E-mail"
                valeu={email}
                onChangeText={(text) => setEmail(text)}
                style={styleSheet.input}
            />
            <TextInput
                 placeholder="Senha"
                 valeu={senha}
                 onChangeText={(text) => setSenha(text)}
                 secureTextEntry={true}
                 style={styleSheet.input}
            />
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            width: '80%',
            borderBottomWidth: 1,
            marginBottom: 10,
            padding: 10,
        },
        createFailed:{
            color: 'red'
        } 
    });
    
    export default TelaAddUser;