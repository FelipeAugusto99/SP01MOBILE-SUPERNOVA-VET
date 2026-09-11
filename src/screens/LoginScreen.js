import { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function LoginScreen() {
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    async function fazerLogin() {
        if (!username || !password) {
            setErro('Preencha usuário e senha.');
            return;
        }

        try {
            setCarregando(true);
            setErro('');

            await api.get('/pets', {
                auth: {
                    username,
                    password,
                },
            });

            login(username, password);
        } catch (error) {
            setErro('Usuário ou senha inválidos.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>SuperNova Vet</Text>

            <Text style={styles.subtitulo}>
                Acesse sua conta
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <TouchableOpacity
                style={styles.botao}
                onPress={fazerLogin}
                disabled={carregando}
            >
                {carregando ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBotao}>Entrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#fff',
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6C63FF',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitulo: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 14,
        marginBottom: 15,
        fontSize: 16,
    },

    botao: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },

    textoBotao: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    erro: {
        color: '#d32f2f',
        textAlign: 'center',
        marginBottom: 10,
    },
});