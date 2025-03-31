import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test-secret' });
    reflector = new Reflector();
    jwtAuthGuard = new JwtAuthGuard(jwtService, reflector);
  });

  const mockExecutionContext = (token: string | null, isValid: boolean): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: token ? { authorization: `Bearer ${token}` } : {},
          user: isValid ? { id: 1, email: 'test@example.com' } : null,
        }),
        getResponse: () => ({}),
        getNext: () => ({}),
      }),
    } as ExecutionContext;
  };

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  it('should allow access when a valid token is provided', () => {
    jest.spyOn(jwtService, 'verify').mockReturnValue({ id: 1, email: 'test@example.com' });

    const context = mockExecutionContext('validToken', true);
    expect(jwtAuthGuard.canActivate(context)).toBe(true);
  });

  it('should deny access when no token is provided', () => {
    const context = mockExecutionContext(null, false);
    expect(jwtAuthGuard.canActivate(context)).toBe(false);
  });

  it('should deny access when an invalid token is provided', () => {
    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const context = mockExecutionContext('invalidToken', false);
    expect(jwtAuthGuard.canActivate(context)).toBe(false);
  });
});
