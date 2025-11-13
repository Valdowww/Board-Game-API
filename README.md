# API Jeux de Société

API REST pour gérer une collection de jeux de société avec authentification JWT.

## Récupération du projet

Cloner le dépôt depuis GitHub :
```bash
git clone https://github.com/TON_USERNAME/boardgame-api.git
cd boardgame-api
```

## Installation

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du projet :
```bash
cp .env.example .env
```

Le fichier `.env` doit contenir :
```
JWT_SECRET=super_secret_key_123
PORT=3000
```

## Lancer l'application

Démarrer en mode développement :
```bash
npm run start:dev
```

Vous devriez voir :
```
API running on http://localhost:3000
```

**Laissez le terminal ouvert pendant que vous testez l'API**

## Utilisation

### Étape 1 : Se connecter

Avant d'utiliser l'API, il faut récupérer un token d'authentification.

**Requête :**
```
POST http://localhost:3000/auth/signin
```

**Body (JSON) :**
```json
{
  "username": "marcel",
  "password": "azerty"
}
```

**Réponse :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Copiez le token** reçu, vous en aurez besoin pour toutes les autres requêtes.

### Étape 2 : Utiliser le token

Pour toutes les requêtes sur `/games`, ajoutez le token dans les headers :
```
Authorization: Bearer <votre_token>
```

Exemple dans Bruno/Postman/Insomnia :
- Key : `Authorization`
- Value : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

N'oubliez pas le mot `Bearer` suivi d'un espace avant le token !

## Liste des endpoints

### Authentification

#### Se connecter
```
POST /auth/signin
```
Body : `{ "username": "marcel", "password": "azerty" }`

Retourne un token JWT valable 2h.

---

### Gestion des jeux

#### Récupérer tous les jeux
```
GET /games
```

Les jeux sont automatiquement triés par ordre alphabétique.

**Paramètres optionnels :**
- `offset` : position de départ (défaut : 0)
- `limit` : nombre de résultats maximum

**Exemples :**
```
GET /games
GET /games?offset=0&limit=10
GET /games?offset=10&limit=5
```

**Code de réponse :** 200

---

#### Récupérer un jeu par son ID
```
GET /games/:id
```

**Exemple :**
```
GET /games/174430
```

**Codes de réponse :**
- 200 : jeu trouvé
- 404 : jeu introuvable

---

#### Créer un nouveau jeu
```
POST /games
```

**Body (JSON) :**
```json
{
  "name": "Catan",
  "published_at": "1995",
  "min_players": "3",
  "max_players": "4",
  "duration": "90",
  "age_min": 10
}
```

Tous les champs sont obligatoires.

**Codes de réponse :**
- 201 : jeu créé avec succès
- 400 : données invalides

---

#### Modifier un jeu
```
PUT /games/:id
```

**Body (JSON) :**
Vous pouvez mettre seulement les champs à modifier :
```json
{
  "name": "Nouveau nom du jeu"
}
```

Ou plusieurs champs :
```json
{
  "name": "Catan - Édition 2024",
  "duration": "100"
}
```

**Codes de réponse :**
- 200 : jeu modifié
- 400 : données invalides
- 404 : jeu introuvable

---

#### Supprimer un jeu
```
DELETE /games/:id
```

**Exemple :**
```
DELETE /games/174430
```

**Codes de réponse :**
- 204 : suppression réussie (pas de contenu retourné)
- 404 : jeu introuvable

---

## Comment tester l'API

### Avec Bruno

#### Test 1 : Connexion
1. Créer une requête `POST http://localhost:3000/auth/signin`
2. Dans Body → JSON, mettre :
   ```json
   {
     "username": "marcel",
     "password": "azerty"
   }
   ```
3. Envoyer
4. Copier le `access_token` reçu

#### Test 2 : Liste des jeux
1. Créer une requête `GET http://localhost:3000/games`
2. Dans Headers, ajouter :
   - Key : `Authorization`
   - Value : `Bearer <votre_token>`
3. Envoyer
4. Vous devriez voir la liste des jeux triée alphabétiquement

#### Test 3 : Pagination
1. `GET http://localhost:3000/games?offset=0&limit=3`
2. Avec le header Authorization
3. Vous devriez recevoir seulement 3 jeux

#### Test 4 : Récupérer un jeu
1. `GET http://localhost:3000/games/174430`
2. Avec le header Authorization
3. Vous recevez les infos d'un seul jeu

#### Test 5 : Créer un jeu
1. `POST http://localhost:3000/games`
2. Headers : Authorization
3. Body :
   ```json
   {
     "name": "Test Game",
     "published_at": "2024",
     "min_players": "2",
     "max_players": "4",
     "duration": "60",
     "age_min": 12
   }
   ```
4. Notez l'ID du jeu créé dans la réponse

#### Test 6 : Modifier le jeu
1. `PUT http://localhost:3000/games/<id_du_jeu_créé>`
2. Headers : Authorization
3. Body :
   ```json
   {
     "name": "Test Game Modifié"
   }
   ```

#### Test 7 : Supprimer le jeu
1. `DELETE http://localhost:3000/games/<id_du_jeu_créé>`
2. Headers : Authorization
3. Vous devriez recevoir un code 204

#### Test 8 : Vérifier la suppression
1. `GET http://localhost:3000/games/<id_du_jeu_supprimé>`
2. Headers : Authorization
3. Vous devriez recevoir un code 404
