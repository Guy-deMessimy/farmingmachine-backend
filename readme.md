# Taskberry server 🫐

## Installation

Cloner le repo et lancer un `yarn` pour récupérer les dépendances. Se diriger ensuite vers le terminal et accéder à l'interface mysql

```sh
mysql -u root -p
```

puis créer la base pour que Prisma puisse y accéder

```sql
CREATE DATABASE IF NOT EXISTS taskberry;
```

quitter mysql avec `exit` et créer un fichier `.env` pour renseigner la variable pour la connexion a la db

```dosini
PRISMA_DATABASE_URL=mysql://root:password$@localhost:3306/taskberry
```

lancer ensuite la migration Prisma

```sh
npx prisma migrate dev --name init
```

lancer ensuite le serveur avec `yarn start` qui sera sur [localhost:4000](http://localhost:4000/)

![apollo server](https://i.ibb.co/jRgwD1M/image.png)

## Tests & docker

Pour chaque feature, rédiger les tests pour s'assurer que le dev n'a pas provoqué des effets indésirables sur les autres cas de figure.

Pour les tests avec le build docker

```sh
docker-compose -f docker-compose.test.yml build --no-cache
docker-compose -f docker-compose.test.yml run --rm server yarn prisma migrate dev --name init
docker-compose -f docker-compose.test.yml run --rm server yarn jest -i
```

La documentation des tests unitaires pour Prisma + Jest est disponible sur [Prisma Docs](https://www.prisma.io/docs/guides/testing/unit-testing)

## Infos

### Prisma studio

Pour lancer Prisma studio

```sh
npx prisma studio
```

Une session sera lancée sur [localhost:5555](http://localhost:5555/)

![prisma studio](https://i.ibb.co/X5cy56m/image.png)

### Commits & merge

Quand une feature est terminée, rebase sur master avant de créer un PR:

```sh
git rebase master
```

gérer les conflits et continuer avec

```sh
git rebase --continue
```

**si nécéssaire** appliquer un `push` (regarder l'arbre des commits)

```sh
git push --force
```

quand la branche est merge, on peut supprimer la branche locale et distante

```sh
git branch -d <branch>
git push -d origin <branch>
```

Si commits WIP présents sur la branche, rejouer les commits après un `reset` et faire un `push` une fois terminé

```sh
git reset <sha commit parent>
git push --force
```
### vscode debugger

A l'ouverture de session vscode effectuer 

```sh
ctrl+shift+P 
```

puis cliquer sur 

```sh
"désactiver temporairement l'attachement automatique dans cette session"
```

vérifier la présence de la configuration ci-dessous dans .vscode/launch.json

```sh
 "Run apollo server in development mode" 
```

ouvrir un terminal puis placer les points d'arrêts dans le code 
 
cliquer sur le bouton play dans la barre latérale gauche vscode ou ⇧⌘D correspondant à

```sh
"Exécuter et déboguer" 
```

puis sur le bouton vert lecture de

```sh
 "Run apollo server in development mode" 
```

dans le terminal / onglet console de debogage vérifier que le server est bien lancé

```sh
🚀 Server ready at: http://localhost:4000
```

une instance de node dédiée pour le debug avec VSCode est ouverte et il n'est donc plus possible de run l'application 
en même temps (conflit de port) aussi ne pas effectuer de :

```sh
 "yarn start" 
```

au cas où cette commande a été lancée avant le debugg il faut stopper l'application 

```sh
CTRL+C 
```

puis relancer le debugg

depuis Appollo studio effectuer votre requete

le code s'exécutera jusqu’à votre point d'arrêt depuis lequel vous pourrez consulter et vérifier tout ce qui vous semble utile pour traquer ce 🤬 bug.

pour arreter le debugg et couper l'instance de node il suffit d'appuyer sur la touche arret du control panel


NEW FARMING MACHINE
- invoke the CLI locally : npx prisma
- create initial prisma setup using : npx prisma init
- init db on mysql farmingmachine
- set .env
- after prisma model in place generate prisma migrations files : npx prisma migrate dev --name init
- To install Prisma Client in your project : npm install @prisma/client (run prisma generate on first time)
- Update your generated Prisma Client after every change to Prisma models : prisma generate
- The prisma generate command reads your Prisma schema and updates the generated Prisma Client library inside node_modules/@prisma/client. 
- for debugging nest js application please ref to https://javascript.plainenglish.io/debugging-nestjs-in-vscode-d474a088c63b
- Abstract away the Prisma Client API for database queries within a service. To get started, you can create a new PrismaService that takes care of instantiating PrismaClient and connecting to your database : nest g service
- generate a new controller : nest g controller
- encompass business domain on modules: nest g module {name}
- defines the interface for input or/and output within our system : nest g class user/dto/create-user.dto --no-spec
- In order to check correct shape and/or missing require fields of request, add validation rules to our DTO and use validationPipe : npm i class-validator class-transformer
- Simplify common transformation by adding :  npm i @nestjs/mapped-types


