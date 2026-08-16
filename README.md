# Busca de Usuários do GitHub

Encontrar informações de um usuário do GitHub pode envolver diferentes requisições, estados de carregamento e tratamentos de erro. Neste projeto, foi desenvolvida uma aplicação responsiva que permite pesquisar um usuário pelo seu _username_ e visualizar seus dados públicos e repositórios.

A aplicação consulta a API pública do GitHub e apresenta as informações em uma interface organizada em cards. Também é possível selecionar um repositório para visualizar detalhes adicionais em um modal.

A aplicação possui as seguintes funcionalidades:

- Pesquisa de usuários pelo _username_ do GitHub
- Validação do campo de pesquisa
- Indicador de carregamento durante as requisições
- Exibição de mensagens de erro
- Apresentação dos dados públicos do usuário
- Listagem dos repositórios em cards
- Modal com informações detalhadas de cada repositório
- Cancelamento de requisições pendentes
- Interface responsiva para celulares e tablets

Tudo isso usando React, TypeScript, Axios, React Router e Tailwind CSS.

## Antes de começar:

Para executar o projeto, faça o clone do repositório, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Depois, acesse o endereço exibido pelo Vite no terminal.

Também estão disponíveis os seguintes comandos:

```bash
# Verificar o código com o ESLint
npm run lint

# Gerar a versão de produção
npm run build

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
- Requisições pendentes são canceladas com `AbortController` quando o componente é desmontado ou a pesquisa muda.

> [!NOTE]
> O cancelamento evita que uma requisição antiga atualize a interface depois que o usuário já saiu da página ou iniciou outro fluxo.

**Responsividade e acessibilidade**

- O layout se adapta a celulares e tablets.
- Campos e botões podem ser utilizados pelo teclado.
- O carregamento utiliza atributos próprios para tecnologias assistivas.
- O modal possui semântica de diálogo, foco inicial e suporte à tecla `Esc`.
- Os elementos interativos possuem estados visuais de foco.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- GitHub REST API

## 📁 Organização do projeto

```text
src/
├── assets/                         # Imagens utilizadas na interface
├── components/                     # Componentes reutilizáveis
│   ├── Loading/                    # Indicador de carregamento
│   ├── Modal/                      # Detalhes do repositório
│   └── UserInformationComponents/ # Cards de usuário e repositórios
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
- Cancelamento com `AbortController`
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
- Modal acessível
- Feedback visual para interações
