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

5. Sobre a parte de Kubernetes:

5.0. criar imagem da aplicação codepix e subir no docker hub

> cd codepix; docker build -t lucianobrum/codepix-go:latest -f Dockerfile.prod ./;
> docker login
> docker push lucianobrum/codepix-go:latest

5.1. Instalar o 'kind' ferramenta que simula o Kubernetes em containers docker.

```sh
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind


kind create cluster --name=codepix

Instalar o kubectl:
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client

kubectl cluster-info --context kind-codepix
kubectl get node
docker ps

kubectl apply -f configmap.yaml
kubectl apply -f deploy.yaml
kubectl get pods
kubectl describe pod xyz...
kubectl logs xyz...

```

Instalar Helm para poder usar postgres dentro do Kubernetes (não recomendado, fins didáticos).

```sh
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql

export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)
echo $POSTGRES_PASSWORD
# JGvJbOQon7

kubectl run postgres-postgresql-client --rm --tty -i --restart='Never' --namespace default --image docker.io/bitnami/postgresql:16.0.0-debian-11-r13 --env="PGPASSWORD=$POSTGRES_PASSWORD" --command -- psql --host postgres-postgresql -U postgres -d postgres -p 5432
```

```sql
create database codepix;
create database bank001;
create database bank002;
```

Pegar a configuração dsn do arquivo .env, adaptar os valores conforme abaixo:

> dsn="dbname=codepix sslmode=disable user=postgres password=JGvJbOQon7 host=postgres-postgresql"

E converter para base 64 e inserir no secret.yaml em data -> dsn do codepix:

```sh
ZHNuPSJkYW5pbmU9Y29kZXBpeCBzc2xtb2RlPWRpc2FibGUgdXNlcj1wb3Jnc3RvZ3JlcyBwYXNzd29yZD1KR3ZKYk9Rb24xNyBob3N0PXBvc3RncmVzLXBvc3RncmVs

kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deploy.yaml
kubectl get services

kubectl delete pod codepix-xyz... # para deletar pods, kubernetes recria outro

```

Adicionar o kafka no kubernetes (não é muito usado, geralmente tem servidor dedicado e etc, por exigir baixa latência e etc).

Obs: o kafka do curso é 2.7.0 e a atual é 3.6.0, pode estar dando problemas...
no antigo tem kafka0 e kafka-zookeeper e no atual tem kafka-controller-0, kafka-controller-1 e kafka-controller-2...

```sh
helm install kafka bitnami/kafka

kubectl get pods
kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deploy.yaml
kubectl apply -f service.yaml

kubectl get svc
kubectl get configmaps
```

```sh
> cd nestjs; docker build -t lucianobrum/imersao-bankapi:latest -f Dockerfile.prod ./;
> docker login
> docker push lucianobrum/imersao-bankapi:latest
```

Pegar a senha do postgres (que gerou automático anteriormente) e fazer encode em Base64 e colar no secret.yaml do bankapi.

No diretório do k8s/bankapi:

```sh
kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml
kubectl exec -it bankapi-7d4996dd46-bp72s bash

Rodar no container:

npm run typeorm migration:run
npm run console fixtures
```

```sh
kubectl port-forward svc/bankapi-service 8080:3000
```

Fazer mesmo para o bankapi002:
```sh
kubectl apply -f .
kubectl exec -it bankapi-2 bash

Rodar no container:

npm run typeorm migration:run
npm run console fixtures
```

Agora o nextjs:

Obs: não consegui fazer o build !! 

```sh
> cd nextjs; docker build -t lucianobrum/imersao-bankfrontend:latest -f Dockerfile.prod ./;
> docker login
> docker push lucianobrum/imersao-bankfrontend:latest
```

```sh
cd k8s/bankfrontend/;kubectl apply -f .;
kubectl port-forward svc/bankfrontend-service 9090:3000
```

Obs: a requisição do browser para o nestjs não vai funcionar (ex: ao cadastrar pix), por causa do 

> NEXT_PUBLIC_NEST_API_URL=http://bankapi-service:3000/api

do configmap do bankfrontend, que no caso do kubernetes, precisaria ter um IP acessível do ambiente externo.

```sh
cd k8s/bankfrontend002/;kubectl apply -f .;
kubectl port-forward svc/bankfrontend-service 9090:3000
```

Pendente subir na cloud :-).


