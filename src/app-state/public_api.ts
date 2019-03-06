export { VbAppStateModule } from './src/app-state.module';
export { ErrorService } from './src/services/error.service';
export { ErrorComponent } from './src/components/error/error.component';
export { FlagsComponent } from './src/components/flags/flags.component';
export { LangPipe } from './src/pipes/lang.pipe';
export { KeyError, ErrorDetail, BasicError, RequestError, ServerError} from './src/models/request-error.interface';
export { User, Role } from './src/models/user.model';
export { LangUtil } from './src/util/lang.util';
export * from './src/models/flag.model';
export { AppStateConfig } from './src/models/config.model';

import * as store from './src/store/index';
export const appStore = store;
