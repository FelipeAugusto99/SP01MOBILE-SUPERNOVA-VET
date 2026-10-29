import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  BadgeRisco,
  Botao,
  Card,
  Icone,
  MensagemErro,
} from '../components';
import { usePermissoes } from '../hooks/usePermissoes';
import { useExcluirPet, usePet } from '../hooks/usePets';
import { useEstilos } from '../theme/useEstilos';
import { obterMensagemErro } from '../utils/erros';
import { obterEmojiEspecie } from '../utils/pets';

function Informacao({ label, valor }) {
  const styles = useEstilos(criarEstilos);

  return (
    <View style={styles.informacao}>
      <Text style={styles.label}>
        {label}
      </Text>

      {typeof valor === 'string' ? (
        <Text style={styles.valor}>
          {valor}
        </Text>
      ) : (
        valor
      )}
    </View>
  );
}

export default function PetDetailsScreen({ route, navigation }) {
  const petInicial = route.params?.pet;
  const styles = useEstilos(criarEstilos);
  const { editarPets, excluirPets } = usePermissoes();

  const { data: pet = petInicial } = usePet(petInicial.id);

  const [erro, setErro] = useState('');

  const mutation = useExcluirPet();

  function confirmarExclusao() {
    Alert.alert(
      'Excluir pet',
      `Tem certeza que deseja excluir ${pet.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setErro('');
            mutation.mutate(pet.id, {
              onSuccess: () => navigation.goBack(),
              onError: (error) =>
                setErro(
                  obterMensagemErro(error, {
                    403: 'Você não tem permissão para excluir este pet.',
                    padrao: 'Não foi possível excluir o pet.',
                  })
                ),
            });
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Card style={styles.card}>
        <Icone
          conteudo={obterEmojiEspecie(pet.especie)}
          tamanho={80}
          style={styles.icone}
        />

        <Text style={styles.nome}>
          {pet.nome}
        </Text>

        <Informacao label="Espécie" valor={pet.especie} />
        <Informacao label="Idade" valor={`${pet.idade} anos`} />
        <Informacao
          label="Nível de risco"
          valor={<BadgeRisco nivel={pet.nivelRisco} />}
        />
        <Informacao
          label="Tutor"
          valor={pet.tutor?.nome || 'Não informado'}
        />
      </Card>

      <MensagemErro mensagem={erro} />

      {editarPets ? (
        <Botao
          titulo="Editar pet"
          onPress={() => navigation.navigate('PetForm', { pet })}
          disabled={mutation.isPending}
        />
      ) : null}

      {excluirPets ? (
        <Botao
          titulo="Excluir pet"
          variante="perigo"
          onPress={confirmarExclusao}
          carregando={mutation.isPending}
        />
      ) : null}
    </ScrollView>
  );
}

const criarEstilos = (cores) => ({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  conteudo: {
    padding: 20,
  },

  card: {
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  icone: {
    marginBottom: 15,
  },

  nome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 20,
  },

  informacao: {
    width: '100%',
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    color: cores.textoTerciario,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  valor: {
    fontSize: 16,
    color: cores.texto,
  },
});
