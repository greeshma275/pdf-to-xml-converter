import { Controller, Post, Get, Body, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto'; 
import { RegisterDto } from './dto/register.dto'; // Ensure this DTO exists

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.email || !loginDto.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.login(loginDto);
  }

  @Get('profile')  // Correct way to define a GET route
  @UseGuards(JwtAuthGuard)  // Protect with JWT
  getProfile(@Req() req) {
    return req.user;  // Return user details from JWT payload
  }
  @Post('register')
async register(@Body() registerDto: RegisterDto) {
  return this.authService.register(registerDto.email, registerDto.password);
}

}
