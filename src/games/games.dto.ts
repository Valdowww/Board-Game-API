import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  published_at: string;

  @IsString()
  @IsNotEmpty()
  min_players: string;

  @IsString()
  @IsNotEmpty()
  max_players: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  age_min: number;
}

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  published_at?: string;

  @IsString()
  @IsOptional()
  min_players?: string;

  @IsString()
  @IsOptional()
  max_players?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsNumber()
  @IsOptional()
  age_min?: number;
}