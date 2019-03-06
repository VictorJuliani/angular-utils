export { VbFileManagerModule, configFactory } from './src/file-manager.module';
export { FileManagerComponent } from './src/manager/file-manager.component';
export { FileManagerConfig, DEFAULT_FILE_MANAGER_CONFIG, NFMDefaultConfig, NFMConfig } from './src/shared/models/config.model';
export { NFMHistory } from './src/shared/models/history.model';
export { NFMItem } from './src/shared/models/item.model';

import * as store from './src/shared/store/index';
export const nfmStore = store;
