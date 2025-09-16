# MyContacts - M1 dev full stack - Full stack JS

## Front

React

## Back

Node, express, mongo, jwt

init :

```bash
npm init -y
```

express :

```bash
npm install express
```

pour mongo utiliser Atlas -> <https://www.mongodb.com/resources/products/fundamentals/create-database>

Atlas :
user : 444chak_db_user
password : (clipboard)

architecture MVC :

```text
/server
    /controllers        - controleurs logique
    /models
        /contact.js     - model pour un contact
        /user.js        - model pour un utilisateur
    /routes
        /auth.js        - routes d'authentification
        /contacts.js     - routes pour les contacts
    /middlewares
        /contacts.js    - middlewares pour protéger les routes
    /index.js           - fichier principal
```

RUN back-end :

```bash
node server/index.js
```

BRUNO Collection :

équivalent à postman (open source ^^)
TODO :

séparer config

ajouter services (auth, contact)

ajouter validation & errors middleware

----

Pour le readme :
faire le .env server (avec example)

npm i
npm start

TODO :  
[x] gérer la validation en front (messages d'erreurs précis (avec peut être un helper / utils))  
[ ] séparer les controllers en controllers+services (à voir comment faire )  
[ ] faire la doc (readme)  
[x] faire marcher swagger en dist  
[ ] TUs
