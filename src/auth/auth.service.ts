import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = [
    { username: 'marcel', password: 'azerty' }
  ];

  constructor(private jwtService: JwtService) {}

  async signin(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({ username });
    return { access_token: token };
  }
}
