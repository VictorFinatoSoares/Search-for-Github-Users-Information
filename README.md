# Módulo 2: Desafio Final | Search for User Information

Enunciado do desafio proposto: Crie uma aplicação responsiva até tablet, onde deverá ter uma tela com um campo de pesquisa que será inserido um nome de usuário do GitHub e então, duas requisições serão feitas para as seguintes APIs:

https://api.github.com/users/{username}
https://api.github.com/users/{username}/repos

Após as requisições serem feitas, apresente em uma nova página os dados do usuário como: foto/avatar, nome, descrição da bio e também sua lista de repositórios.

Os repositórios precisam ser exibidos em formato de card, trazendo as seguintes informações: nome (name) e descrição (description).

Ao clicar em um repositório, um modal deverá ser aberto com informações mais detalhadas:

Tipo de privacidade (visibility), link de acesso ao projeto (html_url), descrição (description) e linguagem (language).

A aplicação precisa ter validações para que não seja possível pesquisar sem digitar no campo, também deverá ter um loading indicando o momento em que a requisição está sendo feita e exibir mensagem de erro caso ocorra algum problema na requisição.

A aplicação possui as seguintes funcionalidades:

- Pesquisa de usuários pelo _username_ do GitHub
- Validação do campo de pesquisa
- Indicador de carregamento durante as requisições
- Exibição de mensagens de erro
- Apresentação dos dados públicos do usuário
- Listagem dos repositórios em cards
- Modal com informações detalhadas de cada repositório
- Interface responsiva para celulares e tablets

## Antes de começar

Para executar o projeto, faça o clone do repositório, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

### A API

A aplicação utiliza a API pública do GitHub para obter os dados do usuário e seus repositórios. As requisições são realizadas nos seguintes endpoints:

- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos`

A consulta de repositórios está configurada para retornar até 50 resultados. Esse limite é informado na própria interface da aplicação.

Como as requisições são feitas sem autenticação, elas estão sujeitas aos limites de uso da API pública do GitHub. A aplicação apresenta uma mensagem específica caso esse limite seja atingido.

## Requisitos implementados

**Pesquisa e validação**

- O usuário pode informar um _username_ do GitHub no campo de pesquisa.
- Não é possível realizar a busca com o campo vazio.
- Pesquisas contendo espaços entre os caracteres são rejeitadas.
- O valor informado é tratado antes de ser utilizado na URL.

**Dados do usuário**

Após uma pesquisa bem-sucedida, a aplicação exibe:

- Foto ou avatar
- Nome
- _Username_
- Biografia
- Localização
- Link para o perfil no GitHub

Quando uma informação opcional não está disponível, a interface apresenta um texto alternativo.

**Lista de repositórios**

Os repositórios são exibidos em cards contendo:

- Nome (`name`)
- Descrição (`description`)

Caso o usuário não possua repositórios públicos, uma mensagem é apresentada no lugar da lista.

**Detalhes do repositório**

Ao selecionar um card, um modal apresenta:

- Tipo de visibilidade (`visibility`)
- Link de acesso ao projeto (`html_url`)
- Descrição (`description`)
- Linguagem principal (`language`)

O modal pode ser fechado pelo botão, pela tecla `ESC` ou por um clique no fundo da tela. Enquanto estiver aberto, a rolagem do conteúdo ao fundo permanece bloqueada.

**Carregamento e tratamento de erros**

- Um indicador de carregamento é exibido enquanto os dados são consultados.
- Usuários inexistentes recebem uma mensagem de erro específica.
- Falhas de conexão e erros da API são tratados na interface.
- O limite de requisições da API do GitHub possui tratamento próprio.

**Responsividade e acessibilidade**

- O layout se adapta a celulares e tablets.
- Campos e botões podem ser utilizados pelo teclado.
- O carregamento utiliza atributos próprios para tecnologias assistivas.
- O modal possui semântica de diálogo, foco inicial e suporte à tecla `Esc`.
- Os elementos interativos possuem estados visuais de foco.

## Tecnologias que utilizei

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- GitHub REST API

### Como o projeto ficou estruturado

```text
src/
├── assets/                         # Imagens utilizadas na interface
├── components/                     # Componentes reutilizáveis
│   ├── Loading/                    # Indicador de carregamento
│   ├── Modal/                      # Detalhes do repositório
│   └── UserInformationComponents/  # Cards de usuário e repositórios
├── hooks/                          # Hook personalizado para buscar os dados
├── pages/                          # Páginas e rotas da aplicação
├── services/                       # Configuração e chamadas da API
├── types/                          # Tipos dos dados recebidos
├── App.tsx                         # Definição das rotas
└── main.tsx                        # Inicialização da aplicação
```

#### Consumo de APIs

- Requisições HTTP com Axios
- Requisições paralelas com `Promise.all`
- Tratamento de respostas e erros
- Tipagem de dados externos com TypeScript

#### React e navegação

- Componentização
- Estados e efeitos com Hooks
- Rotas dinâmicas com React Router
- Renderização condicional
- Comunicação entre componentes por propriedades

#### Interface e experiência do usuário

- Layout responsivo com Tailwind CSS
- Estados de carregamento e erro
- Validação de formulário
- Feedback visual para interações
