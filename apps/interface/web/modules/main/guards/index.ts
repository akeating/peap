import { AuthGuard } from './auth.guard';
import { TokenGuard } from './token.guard';

export const APP_GUARD_PROVIDERS: any[] = [
  { provide: AuthGuard, useClass: AuthGuard },
  { provide: TokenGuard, useClass: TokenGuard }
];

export {
  AuthGuard,
  TokenGuard
};
