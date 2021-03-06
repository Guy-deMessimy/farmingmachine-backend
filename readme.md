
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
- Avoid users passing invalid properties to our requests and stripped out and removed
- Ensure payloads come in the expected shape
- For type orm : configure app module with TypeOrmModule and rgbd / create an entity with table and column / use 
module with typeOrmModule on service module / usentity with injectRepository on service / create relations / retrieve entities with their relations / using cascading inserts and updates
- Option provider : use custom provider (useValue, useClass, useFactory, async useFactory)
- Option thread : control singleton or multithread providers scope or request-scoped providers

- Binding blocks : control the flow, content, validation 
- Binding blocks : can be globally scope - controller scope (use class or new instance if context need a specific configuration ) - method scope - and specific bonus for pipes : param scope --useful when validation logic concern only one parameter)
- Keep in mind : not overriding - priority to top level

- Exception filters : caught an exception when is not handled by application for send user friendly response
- nest g filter common/filters/http-exception
- complete exception.filter.ts logic and add app.useGlobalFilters(new HttpExceptionFilter()) on main.ts (comment or decomment for example on http://localhost:3000/users/user-id/-1)

- Guards : guards have one responsability, check if the request meets certain conditions (permissions, roles, ACls : authentification and authorization), for example guards extract hand validate token
- nest g guard common/guards/api-key
- complete api-key.guard.ts logic and add app.useGlobalGuards(new ApiKeyGuard()) on main.ts (comment or decomment for example on http://localhost:3000/users/user-id/-1)
- validate an API_KEY is present within each request only on private routes with add the key on Insomnia
 
 - ConfigModule and ConfiService : 
 - npm i @nestjs/config
 - Import ConfigModule on domain module
 - import ConfigService on domain service
 - add CongigService on service contructor
 - update .env and test console.log(argument's service)
 - example : set api-guards with CongigService to get API_KEY

- use setMetadata decorator to route handlers
- create decorators file on common 
- update logic on ApiKeyGuard : access routes metadata in our guard with Reflector (retrieved metadata within a specific context)
- update main.ts for boostrapping application : because we are using @injection dependancy inside of our Guard wich was 
instantiated in the main file => fix it by create a module guard : nest g mo common
- app.useGlobalGuards(new ApiKeyGuard()) on main.ts is only available if guards do not use dependancy injection
- use @Public() to illustrate purpose
- testing with roles

- Interceptors : transform the result, transform exception, extend basic method behavior ...

1/ transform result
- create a new WrapResponseInterceptor will handle incoming request and "wrap" our data for us automatically
- nest g interceptor common/interceptors/wrap-response
- cf Observable (Rxjs) it easier to compose async promises or callback base code
- implemant custom logic both before and after the exectution of the final route
- test request / response lifecycle with insomnia

2/ extend logic
- add a timeout if an endpoint doesn't return anything after a certain period (finish request and send back an error message)
- nest g interceptor common/interceptors/timeout
- implemant custom logic both with setTimeout
- Add manual timeout on controller to force timeout interceptor to work

- Pipes : 
- Transformation: where we transform input data to the desired output
- validation: where we evaluate input data and if valid, simply pass it through unchanged. If the data is NOT valid - we want to throw an exception.
- create a custom pipe that automatically parses any incoming string to an integer (alternatively we could use ParseIntPip)
- transform method received 2 parameters : current input value is processing before it is received by the route handler method and metadata
- other usecase : data fields were missing we can set defaults within pipes
- Pipes also receive the arguments meant to be passed on to the method. Any transformation or validation operation takes place at this time - afterwards the route handler is invoked with any (potentially) transformed arguments.
- implemant custom logic on pipe
- test with insomnia : http://localhost:3000/users/user-id/abc (see console log)

- Middleware : function called before the route handler and any binding blocks
- specified route PATH.
- executing code
- making changes to the request and the response objects.
- ending the request-response cycle.
- Or even calling the next middleware function in the call stack.
- When working with middleware, if the current middleware function does not END the request-response cycle, it must call the next() method, which passes control to the next middleware function.
- Otherwise, the request will be left hanging - and never complete.
- Middleware can be implemanted in function or a class
- function is stateless, can't inject dependancies and access to the nest container
- class can be both
- nest g middleware common/middleware/logging
- implemant custom logic on middleware
- consume middleware on common module
- test on insomnia
- example : mesure of request API time

- custom param decorators
- create protocol.decorator files
- add custom logic within decorator
- use it on controller route method

- describe rest API nest Js app with OpenApi :
    Available operations (endpoints)
    Operation parameters: Input and output for each operation
    Authentication methods
    Contact information, license, terms of use and other information.
    and much more ...
- npm install --save @nestjs/swagger swagger-ui-express
- set main.ts file
- npm run start:dev
- http://localhost:3000/api
- set nest-cli.json to feed swagger param and/or body routes
- add @ApiProperty() to describe dto schema and populate swager UI
- add @ApiResponse() to describe response (add an custome error code to UI swagger routes)
- add tag to related sets and endpoint together to navigate on swagger UI
