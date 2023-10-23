![Imersão Full Stack && Full Cycle](https://events-fullcycle.s3.amazonaws.com/events-fullcycle/static/site/img/grupo_4417.png)

Participe gratuitamente: https://imersao.fullcycle.com.br/

## Sobre o repositório
Esse repositório contém todo código utilizado durante as aulas para referência.

Faça seu fork e também nos dê uma estrelinha para nos ajudar a divulgar o projeto.

install plugins on vs code 'dev container' 'rest client' 'es lint'
plugin dev container allows to use vs code from inside docker container , on install/use need to disable machine ip6, after can enable it again

Passo a passo manual para execução completa da aplicação:

1. executar o kafka;
> cd kafka; docker compose up -d;

2. rodar fixtures para a aplicação go de dentro do container codepix-app
> go run main.go fixtures

3. executar a aplicação go codepix de dentro do container codepix-app
> go run main.go all

3.1. abrir o pgadmin do localhost e conectar no banco:

> usar o IP do localhost + porta 5432:

3. executar a aplicação dos bancos em nestjs;

> cd nestjs; docker compose up -d;

3.1. comandos para execução de dentro do container 'nestjs-app':
> npm install
> BANK_CODE=001 npm run console fixtures
> BANK_CODE=002 npm run console fixtures
> BANK_CODE=001 npm run start:dev
> BANK_CODE=002 npm run start:dev

4. executar o nextjs;

> cd nextjs; docker compose up -d;

4.1. comandos para execução de dentro do container 'nextjs-app':

> npm run 001:dev
> npm run 002:dev




