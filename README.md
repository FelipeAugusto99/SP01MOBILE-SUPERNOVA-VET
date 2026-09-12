# SuperNova VET - Mobile

Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de pets e tutores de uma clínica veterinária.

O projeto faz parte do sistema SuperNova VET e possui integração com uma API REST desenvolvida em Spring Boot.

## Sobre o projeto

O aplicativo permite que usuários autenticados realizem o gerenciamento dos dados da clínica.

As principais funcionalidades são:

- Login e autenticação
- Cadastro de pets
- Consulta de pets
- Edição de pets
- Exclusão de pets
- Cadastro de tutores
- Consulta de tutores
- Edição de tutores
- Exclusão de tutores
- Visualização dos detalhes dos registros
- Consulta de pets em situação crítica

Os dados das funcionalidades principais são obtidos através da API REST.

## Funcionalidades

### Login

O aplicativo possui uma tela de login integrada à API.

O login possui:

- Validação dos campos
- Verificação das credenciais
- Mensagem de erro para credenciais inválidas
- Indicador de carregamento durante a requisição
- Controle de acesso às demais telas após a autenticação

### Pets

O módulo de pets possui as operações de CRUD:

- Cadastro de novos pets
- Listagem dos pets cadastrados
- Visualização dos detalhes
- Edição dos dados
- Exclusão de pets

Cada pet possui informações como nome, idade, espécie, nível de risco e tutor responsável.

### Tutores

O módulo de tutores também possui operações de CRUD:

- Cadastro de novos tutores
- Listagem dos tutores cadastrados
- Visualização dos detalhes
- Edição dos dados
- Exclusão de tutores

Os tutores possuem informações como nome, e-mail, telefone e perfil.

O sistema também trata situações em que um tutor possui pets vinculados, respeitando as regras de negócio definidas pela API.

## Telas

O aplicativo possui as seguintes telas:

1. Login
2. Home
3. Pets
4. Detalhes do Pet
5. Cadastro e edição de Pet
6. Tutores
7. Detalhes do Tutor
8. Cadastro e edição de Tutor

A navegação entre as telas é realizada utilizando React Navigation.

## Integração com a API

A comunicação com a API é realizada utilizando Axios.

As requisições são gerenciadas utilizando TanStack Query, que permite controlar os estados de carregamento, erros, cache e atualização dos dados após alterações.

Principais endpoints utilizados:

    GET    /pets
    POST   /pets
    PUT    /pets/{id}
    DELETE /pets/{id}

    GET    /tutores
    POST   /tutores
    PUT    /tutores/{id}
    DELETE /tutores/{id}

    GET    /pets/criticos

Após operações de cadastro, edição ou exclusão, os dados são atualizados utilizando o TanStack Query, sem necessidade de reiniciar o aplicativo.

## Estrutura do projeto

    SP01MOBILE-SUPERNOVA-VET/
    │
    ├── assets/
    │
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js
    │   │
    │   ├── screens/
    │   │   ├── LoginScreen.js
    │   │   ├── HomeScreen.js
    │   │   ├── PetsScreen.js
    │   │   ├── PetDetailsScreen.js
    │   │   ├── PetFormScreen.js
    │   │   ├── TutoresScreen.js
    │   │   ├── TutorDetailsScreen.js
    │   │   └── TutorFormScreen.js
    │   │
    │   └── services/
    │       ├── api.js
    │       ├── petsService.js
    │       └── tutoresService.js
    │
    ├── App.js
    ├── app.json
    ├── package.json
    └── README.md

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- React Navigation
- Axios
- TanStack Query
- AsyncStorage
- API REST
- Spring Boot

## Backend

O aplicativo utiliza a API do projeto SuperNova VET Java Advanced.

Repositório:

https://github.com/kaique-masc/SUPERNOVAVET_JAVA_ADVANCED

O backend é responsável pela persistência dos dados, autenticação, validações e regras de negócio.

## Como executar

### Pré-requisitos

- Node.js
- npm
- Expo
- Expo Go ou emulador Android/iOS
- API do backend em execução

### Instalação

Clone o repositório:

    git clone https://github.com/FelipeAugusto99/SP01MOBILE-SUPERNOVA-VET.git

Entre na pasta do projeto:

    cd SP01MOBILE-SUPERNOVA-VET

Instale as dependências:

    npm install

### Configuração da API

Abra o arquivo:

    src/services/api.js

Configure o endereço da API de acordo com o ambiente utilizado:

    const api = axios.create({
      baseURL: 'http://SEU_IP:8080',
      timeout: 10000,
    });

Quando o aplicativo for executado em um celular físico, o computador e o celular devem estar conectados à mesma rede.

### Executando o projeto

Inicie o Expo:

    npx expo start

Depois, abra o projeto pelo Expo Go ou por um emulador compatível.

## Autenticação

A autenticação utiliza as credenciais cadastradas no backend.

O sistema possui diferentes perfis de acesso, como:

- ADMIN
- VETERINARIO

As permissões de cada operação são controladas pelo backend através do Spring Security.

## Integrantes

Felipe Augusto Lopes Ferreira

Kaique Mascarenhas dos Santos

## Projeto acadêmico

Projeto desenvolvido para as atividades acadêmicas da FIAP.

## Licença

Projeto desenvolvido para fins acadêmicos.
