![Imersão Full Stack && Full Cycle](https://events-fullcycle.s3.amazonaws.com/events-fullcycle/static/site/img/grupo_4417.png)

Participe gratuitamente: https://imersao.fullcycle.com.br/

## Sobre o repositório
Esse repositório contém todo código utilizado durante as aulas para referência.

Faça seu fork e também nos dê uma estrelinha para nos ajudar a divulgar o projeto.

install nodejs
install nvm
install nest.js -> sudo npm install -g @nestjs/cli
nest new nestjs
npm run start:dev
nest g module bank-accounts
nest g resource -> bank-accounts , REST, yes to CRUD
docker compose up -d 
npm install typeorm @nestjs/typeorm (no app container)
sudo npm install pg --save
install plugins on vs code 'dev container' 'rest client' 'es lint'
plugin dev container allows to use vs code from inside docker container , on install/use need to disable machine ip6, after can enable it again
nest g resource -> pix-keys , REST, yes to CRUD
subir kafka + golang (banco central) + nestjs (docker compose)
adicionar extra_hosts nos docker composes (host.docker.internal)
entra container do app go -> go run main.go all
para node funcionar com grpc: npm isntall @grpc/proto-loader @grpc/grpc-js @nestjs/microservices ( no container do node app)
nest g resource -> transactions
npm install class-validator class-transformer
npm install kafkajs
npm install @nestjs/config
BANK_CODE=001 npm run start:dev
npm install nestjs-console
nest g module fixtures
