# SuperNova VET - Mobile

Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de pets e tutores de uma clínica veterinária.

O projeto faz parte do sistema SuperNova VET e possui integração com uma API REST desenvolvida em Spring Boot.

## Sobre o projeto

O aplicativo permite que a equipe da clínica (ADMIN e VETERINARIO) gerencie pets e tutores, e que tutores acompanhem os próprios pets.

Principais funcionalidades:

- Login com validação das credenciais na API (`/auth/me`)
- Sessão persistente com AsyncStorage (fechar e reabrir o app mantém o login)
- Logout pelo botão **Sair** no header da Home
- Cadastro de novos usuários (perfil TUTOR) pela tela **Criar conta**
- CRUD completo de pets e tutores
- Filtro de pets por nível de risco (BAIXO, MEDIO, ALTO)
- Telas adaptadas ao perfil logado (ADMIN, VETERINARIO, TUTOR)
- Notificação local quando um pet entra em risco ALTO
- Tema claro/escuro (automático pelo sistema ou escolhido pelo usuário)
- Tela **Sobre o App** com versão e hash do commit da versão publicada

## Funcionalidades

### Autenticação

- Login com e-mail e senha, validado na API via Basic Auth (`GET /auth/me`, que também retorna o perfil)
- Credenciais salvas no AsyncStorage e restauradas ao abrir o app (o axios é reconfigurado no boot)
- Se a API responder 401 com uma sessão ativa (senha alterada, usuário removido), a sessão é encerrada automaticamente
- Logout no header da Home, com confirmação
- Tela de cadastro de conta (`POST /auth/register`), que já autentica o usuário após criar a conta

### Perfis de acesso

| Ação | ADMIN | VETERINARIO | TUTOR |
| --- | --- | --- | --- |
| Ver todos os pets | Sim | Sim | Não |
| Ver os próprios pets (`/pets/meus`) | Não | Não | Sim |
| Cadastrar / editar pets | Sim | Sim | Não |
| Excluir pets | Sim | Não | Não |
| Gerenciar tutores | Sim | Não | Não |

As regras ficam em `src/utils/permissoes.js` e espelham o Spring Security do backend.

### Pets e Tutores

- Listagem, detalhes, cadastro, edição e exclusão
- Filtro por nível de risco na lista de pets
- O nível de risco é calculado pela idade do pet, seguindo a regra do banco (trigger `trg_definir_risco_pet`): menos de 4 anos BAIXO, de 4 a 6 anos MEDIO e a partir de 7 anos ALTO. O formulário mostra o risco calculado enquanto a idade é digitada
- Validações no formulário (campos obrigatórios, idade entre 0 e 30, e-mail, telefone com 10 ou 11 dígitos, senha com no mínimo 6 caracteres)
- Após qualquer alteração as consultas são invalidadas pelo TanStack Query e as telas são atualizadas sem reiniciar o app

### Notificações (local)

Cenário: **um pet passa a ter nível de risco ALTO**.

- Enquanto o usuário está logado, o hook `useMonitorPetsCriticos` consulta os pets críticos a cada 30 segundos (e sempre que um pet é salvo no app)
- Quando aparece um pet crítico que ainda não tinha sido notificado, o app dispara uma notificação local: "Pet em situação crítica: Rex (Cachorro) está com nível de risco ALTO"
- O evento pode vir de uma ação no próprio app (cadastrar um pet com 7 anos ou mais, ou editar a idade de um pet para 7 anos ou mais) ou de outro usuário alterando o pet na API
- Tocar na notificação abre a tela de **Detalhes do Pet**
- Para o TUTOR, o monitoramento considera apenas os seus pets, então ele é avisado quando a clínica classifica um pet dele como crítico

### Tema claro/escuro

O tema segue o sistema por padrão. Ele pode ser trocado pelo ícone de lua/sol no header da Home ou na tela Sobre o App (Sistema, Claro, Escuro). A escolha é salva no AsyncStorage.

### Sobre o App

Exibe nome, versão, hash do commit usado no build, endereço da API, usuário logado e a equipe. O hash é gerado no `app.config.js` (`EAS_BUILD_GIT_COMMIT_HASH` no EAS Build ou `git rev-parse HEAD` localmente).

## Telas

1. Login
2. Criar conta
3. Home
4. Pets
5. Detalhes do Pet
6. Cadastro e edição de Pet
7. Tutores
8. Detalhes do Tutor
9. Cadastro e edição de Tutor
10. Sobre o App

## Integração com a API

A comunicação usa Axios (`src/services`) e o estado das requisições é controlado pelo TanStack Query, com os hooks isolados em `src/hooks`.

    GET    /auth/me
    POST   /auth/register

    GET    /pets
    GET    /pets/meus
    GET    /pets/criticos
    POST   /pets
    PUT    /pets/{id}
    DELETE /pets/{id}

    GET    /tutores
    POST   /tutores
    PUT    /tutores/{id}
    DELETE /tutores/{id}

## Arquitetura

O código é separado em camadas:

- **screens/**: apenas interface; não fazem chamadas HTTP nem declaram `useQuery`/`useMutation`
- **components/**: blocos visuais reutilizáveis (Botao, CampoTexto, Card, Icone, BadgeRisco, Opcao, estados de carregamento/erro)
- **hooks/**: hooks do TanStack Query (`usePets`, `useTutores`, `useCadastro`), permissões e monitoramento de pets críticos
- **services/**: acesso à API e ao armazenamento local (axios, AsyncStorage, notificações)
- **utils/**: regras de negócio puras (validações, montagem de payloads, permissões, mensagens de erro)
- **context/**: autenticação e tema
- **theme/**: paletas clara/escura e `useEstilos`
- **navigation/**: rotas públicas e autenticadas

## Estrutura do projeto

    SP01MOBILE-SUPERNOVA-VET/
    ├── assets/
    ├── src/
    │   ├── components/   Botao, CampoTexto, Card, Icone, BadgeRisco, Opcao, Estados, CabecalhoTela
    │   ├── config/       queryClient.js
    │   ├── context/      AuthContext.js, TemaContext.js
    │   ├── hooks/        usePets, useTutores, useCadastro, usePermissoes,
    │   │                 useMonitorPetsCriticos, useAtualizarAoFocar
    │   ├── navigation/   AppNavigator.js, navigationRef.js
    │   ├── screens/      Login, Cadastro, Home, Pets, PetDetails, PetForm,
    │   │                 Tutores, TutorDetails, TutorForm, Sobre
    │   ├── services/     api, authService, petsService, tutoresService,
    │   │                 notificacoesService, sessaoStorage, petsCriticosStorage, appInfoService
    │   ├── theme/        cores.js, useEstilos.js
    │   └── utils/        erros, pets, tutores, permissoes
    ├── App.js
    ├── app.json / app.config.js
    ├── eas.json
    ├── .env
    └── package.json

## Tecnologias utilizadas

- React Native + Expo
- JavaScript
- React Navigation
- Axios
- TanStack Query
- AsyncStorage
- Expo Notifications
- EAS Build + Firebase App Distribution
- API REST em Spring Boot

## Backend

O aplicativo utiliza a API do projeto SuperNova VET (Spring Boot + Oracle).

Repositório:

https://github.com/kaique-masc/SUPERNOVAVET_JAVA_ADVANCED

O backend é responsável pela persistência dos dados, autenticação, validações e regras de negócio.

A tela de cadastro usa o endpoint público `POST /auth/register`, que cria o usuário com perfil TUTOR.

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

O endereço da API fica no arquivo `.env`:

    EXPO_PUBLIC_API_URL=http://SEU_IP:8080

Quando o aplicativo for executado em um celular físico com a API local, o computador e o celular devem estar na mesma rede. Para o app publicado, use o endereço público em que o backend está hospedado.

### Executando o projeto

    npx expo start

Depois, abra o projeto pelo Expo Go ou por um emulador compatível.

## Publicação

O APK é gerado com o EAS Build e distribuído pelo Firebase App Distribution:

    npm install -g eas-cli
    eas login
    eas build -p android --profile preview

O `eas.json` exige que tudo esteja commitado antes do build (`requireCommit`), garantindo que o hash exibido na tela Sobre o App corresponde ao código do repositório. O APK gerado é enviado ao Firebase App Distribution, com o e-mail do professor cadastrado como tester.

## Autenticação

A autenticação utiliza as credenciais cadastradas no backend.

O sistema possui os perfis:

- ADMIN (`admin@supernovavet.com`)
- VETERINARIO (`vet@supernovavet.com`)
- TUTOR (contas criadas pela tela de cadastro)

As permissões de cada operação são controladas pelo backend através do Spring Security.

## Integrantes

Felipe Augusto Lopes Ferreira

Kaique Mascarenhas dos Santos

## Projeto acadêmico

Projeto desenvolvido para as atividades acadêmicas da FIAP.

## Licença

Projeto desenvolvido para fins acadêmicos.
