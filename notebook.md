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
[x] faire la doc (readme)  
[x] faire marcher swagger en dist  
[x] TUs
[ ] gérer responsive
[x] ajouter footer vers lien sur mon site (chkb.fr)
[ ] ajouter loader quand on login et ajouter loader quand on charge les contacts

Fais un readme bien détaillé et complet avec les infos suivantes :

Pour le readme :

- anglais et français
- en dev :
  - soit lancer le serveur et le client séparement (expliquer avec les .env.example, et npm start pour chacun)
  - soit lancer avec le docker-compose.dev.yml (expliquer avec les .env.example, et docker-compose up -d pour lancer le serveur et le client)
- donner les urls de prod (la demo sur <https://efrei-mycontacts-chak.vercel.app/> et <https://mycontacts-chak-prod.up.railway.app/> (client et serveur respectivement))
- expliquer les technologies utiliées (la lib MUI par exemple, l'architecture MVC, les endpoints disponibles, etc.)
- expliquer Bruno (que c'est comme postman et tout hésite pas à faire tes recherches pour expliquer)

Si il manque quelque chose tu as la liberté de l'ajouter.
