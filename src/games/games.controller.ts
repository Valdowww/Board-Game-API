import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from './games.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('games')
@UseGuards(AuthGuard)
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getGames(@Query('offset') offset?: string, @Query('limit') limit?: string) {
    const off = offset ? parseInt(offset) : undefined;
    const lim = limit ? parseInt(limit) : undefined;
    return this.gamesService.getAllGames(off, lim);
  }

  @Get(':id')
  getGame(@Param('id') id: string) {
    return this.gamesService.getGameById(parseInt(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createGame(@Body() body: CreateGameDto) {
    return this.gamesService.createGame(body);
  }

  @Put(':id')
  updateGame(@Param('id') id: string, @Body() body: UpdateGameDto) {
    return this.gamesService.updateGame(parseInt(id), body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteGame(@Param('id') id: string) {
    return this.gamesService.deleteGame(parseInt(id));
  }
}
