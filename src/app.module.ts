import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'super_secret_key_123',
      signOptions: { expiresIn: '2h' },
    }),
    GamesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AppModule {}
