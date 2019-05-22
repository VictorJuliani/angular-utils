export { AuthGuard } from './src/services/auth.guard';
export { AuthService } from './src/services/auth.service';
export { VbAuthModule } from './src/auth.module';
// models
export { AuthConfig } from './src/models/config.interface';
export { Token } from './src/models/token.interface';
// util
export { ALLOW_UNAUTHORIZED, allowUnathorized, stripProtocol } from './src/util/auth.util';
