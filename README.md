# TFC - Trybe Football Club

# Contexto
O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️
Possui uma tabela detalhada que pode ser alterada fazendo requisições ao backend, também lida com jogos ao vivo.

<details>
<summary><strong>👨‍💻 FrontEnd</strong></summary><br />

  ![Exemplo app front](assets/front-example.png)

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

</details>

## Técnologias usadas

  Foi desenvolvido uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de       dados.

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, ES6, Sequelize, modelo MSC

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Container docker MySQL configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;

3️⃣ **Front-end:**
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001`.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;

</details>

<details>
  <summary><strong> 👀 Instalando Dependências e Executando Aplicação </strong></summary><br />

  - Ao rodar o comando `npm run install:apps` na pasta raiz do projeto você automaticamente estará **instalando suas aplicações (front e back)**;
  - Você pode **debugar alguns erros do avaliador** (como por exemplo a validação do banco de dados, ou da compilação do TS), onde são *printadas* na tela algumas infos adicionais, utilizando o comando `npm run test:debug`;
  - Você pode **subir ou descer uma aplicação do compose**, utilizando `npm run` com os scripts `compose:up`, `compose:down`, ou `compose:up:dev`, `compose:down:dev`;
  - Os comando de _compose_ anteriores estão configurados para executar o _docker-compose_ com o terminal desanexado (detached mode `-d`). Caso queira acompanhar os logs de um serviço em tempo real pelo terminal, basta executar `npm run logs [nome_do_servico]` onde _nome_do_servico_ é opcional e pode receber os serviços _backend_, _frontend_ ou _db_

</details>

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Acesse o [link da documentação oficial com passos para desinstalar] (https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

