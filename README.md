# Projeto Final: KImóveis - TypeORM com Relacionamentos

O projeto "Kimóveis" é uma API Rest desenvolvida como parte do curso da Kenzie Academy Brasil, com o objetivo de demonstrar o conhecimento adquirido durante o Módulo 4 do curso de Full-Stack.

## Tecnologias utilizadas

- JavaScript
- Node.js
- TypeScript
- Express
- bcryptjs
- jsonwebtoken
- dotenv
- pg
- typeorm
- zod

## Arquitetura

### O projeto segue uma estrutura organizada em pastas dentro da pasta "/src":

- `/__tests__`: Contem todos os testes automatizados disponibilizados a nós pela Kenzie Academy Brasil.
- `/controllers`: Contém os controladores responsáveis por tratar as requisições e respostas da API.
- `/entities`: Define as entidades do TypeORM para mapear as tabelas do banco de dados.
- `/interfaces`: Contém as interfaces TypeScript utilizadas no projeto.
- `/middlewares`: Responsável pelos middlewares de tratamento de requisições.
- `/migrations`: Armazena as migrações do TypeORM para controle da estrutura do banco de dados.
- `/routes`: Define as rotas da API Rest.
- `/schemas`: Contém os esquemas do Zod para validação e tratamento de dados.
- `/services`: Responsável pelos processos lógicos da aplicação.

### Além disso, também dentro da `/src` existem alguns arquivos principais:

- `app.ts`: Ponto de entrada do projeto.
- `error.ts`: Criação de classe para tratação personalizada de erros.
- `data-source.ts`: Configuração do banco de dados utilizando o TypeORM.
- `server.ts`: Inicialização e configuração do servidor.

## Recursos principais

- Criação de usuários admin ou não admin com criptografia de senha usando bcrypt.
- Login com resposta de token personalizado utilizando jsonwebtoken.
- Controles de usuários com edição e soft-delete.
- Criação de imóveis e categorias de imóveis.
- Marcação de visitas a imóveis, com verificação de disponibilidade tanto para o usuário quanto para o imóvel.
- Visualização de todas as visitas marcadas para um imóvel específico por parte de usuários administradores.

## Instruções de instalação

- Certifique-se de ter o Node.js instalado em sua máquina. Você pode fazer o download e instalá-lo a partir do site oficial do Node.js (https://nodejs.org).
- Abra o terminal ou prompt de comando e navegue até o diretório raiz do seu projeto.
- Execute o comando `npm install`. Isso irá iniciar o processo de instalação das dependências listadas no arquivo `package.json` do seu projeto.
- Aguarde até que o npm conclua o processo de instalação. Ele baixará os pacotes necessários e os armazenará na pasta node_modules do seu projeto.

## Exemplos de uso

**Antes de executar qualquer ambiente, é necessário que se insira as informações necessárias no `.env.example` e que renomeie o arquivo para `.env`, o servidor utiliza essas informações para executar a inicialização do banco de dados e a criptografia das senhas. Caso não presente e preenchido corretamente, a aplicação poderá retornar erro.**

- Para executar o ambiente de desenvolvimento, utilize o comando `npm run dev`. Isso iniciará o servidor e permitirá que você teste a API em um ambiente de desenvolvimento. **Certifique-se de que todas as dependências estejam instaladas corretamente antes de executar este comando.**

- Para executar todos os testes disponíveis na pasta `src/__tests__`, utilize o comando `npm run test`. Isso iniciará a execução dos testes e exibirá os resultados no terminal.

- Se você deseja executar um teste específico presente na pasta `src/__tests__`, basta usar o comando `npm run test nome_do_arquivo_de_teste`, onde `nome_do_arquivo_de_teste` é o nome do arquivo de teste que deseja executar.
