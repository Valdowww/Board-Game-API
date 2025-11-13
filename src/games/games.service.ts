import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class GamesService {
  private dbPath = join(process.cwd(), 'assets', 'data', 'bgg_dataset.json');

  private readDb() {
    const data = readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }

  private writeDb(data: any[]) {
    writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  getAllGames(offset?: number, limit?: number) {
    let games = this.readDb();
    games.sort((a, b) => a.name.localeCompare(b.name));

    if (offset !== undefined && limit !== undefined) {
      return games.slice(offset, offset + limit);
    }

    return games;
  }

  getGameById(id: number) {
    const games = this.readDb();
    const game = games.find(g => g.id === id);

    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  createGame(gameData: any) {
    const games = this.readDb();
    const newId = Math.max(...games.map(g => g.id)) + 1;
    const newGame = { id: newId, ...gameData };
    
    games.push(newGame);
    this.writeDb(games);
    
    return newGame;
  }

  updateGame(id: number, gameData: any) {
    const games = this.readDb();
    const index = games.findIndex(g => g.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    games[index] = { ...games[index], ...gameData };
    this.writeDb(games);
    
    return games[index];
  }

  deleteGame(id: number) {
    const games = this.readDb();
    const index = games.findIndex(g => g.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    games.splice(index, 1);
    this.writeDb(games);
  }
}
