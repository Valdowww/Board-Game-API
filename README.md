# Board Game API

API REST pour gérer des jeux de société avec authentification JWT.

## Installation

```bash
npm install
```

## Lancer l'application

```bash
npm run start:dev
```

L'API sera accessible sur http://localhost:3000

## Endpoints

### Authentification

**POST /auth/signin**
```json
{
  "username": "marcel",
  "password": "azerty"
}
```

Retourne un token JWT à utiliser dans les headers pour les autres requêtes.

### Games (nécessite authentification)

Ajouter le header: `Authorization: Bearer <token>`

- **GET /games** - Liste tous les jeux (triés alphabétiquement)
  - Query params optionnels: `offset` et `limit`
  
- **GET /games/:id** - Récupère un jeu par son ID

- **POST /games** - Crée un nouveau jeu
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

- **PUT /games/:id** - Met à jour un jeu

- **DELETE /games/:id** - Supprime un jeu

## Base de données

Le fichier `assets/data/bgg_dataset.json` sert de base de données.
Remplacez-le par votre fichier complet si nécessaire.
