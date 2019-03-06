export { paginationHeader, getAttributes, getAttribute, hasClass, sort, unsort,
		errorResponse, observableThrow, testCatch } from './src/testing.util';

export { MockAclCommonService, } from './src/mocks/services/acl-common.service.mock';
export { MockFormsService } from './src/mocks/services/forms.service.mock';
export { MockCrudCommonService } from './src/mocks/services/crud-common.service.mock';
export { TranslateTestingFactory, NOOP } from './src/mocks/translate.factory.mock';
export { MockWindowRefService } from './src/mocks/services/window.service.mock';

export { MockHttpHandler, MockHttpRequest } from './src/mocks/http-request.mock';

export { MockAuthService } from './src/mocks/services/auth.service.mock';
export { AuthTestingModule } from './src/mocks/modules/auth.module.mock';
export { BaseTestingModule } from './src/mocks/modules/base.module.mock';
export { CrudTestingModule } from './src/mocks/modules/crud.module.mock';
export { TagTableTestingModule } from './src/mocks/modules/tag-table.module.mock';
export { TranslateTestingModule } from './src/mocks/modules/translate.module.mock';

export { COLORS } from './src/mocks/models/color.mock';
export { DEPARTMENTS } from './src/mocks/models/department.mock';
export { COMPANIES } from './src/mocks/models/company.mock';
export { LOGOS } from './src/mocks/models/logo.mock';
