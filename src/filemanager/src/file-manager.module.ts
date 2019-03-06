import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// store
import { NgxsModule } from '@ngxs/store';
import { NavigatorState } from './shared/store/navigator/navigator.state';
import { PathState } from './shared/store/path/path.state';
// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faChevronDown,
		faFolder, faFile, faFolderOpen, faFileSignature,
		faEllipsisV, faSearch, faThList, faThLarge,
		faLongArrowAltUp, faLongArrowAltDown, faArrowAltCircleLeft, faArrowRight, faArrowsAlt,
		faHandPointRight, faHandPointUp, faLayerGroup,
		faTimes, faCheckCircle, faBan, faExclamationTriangle,
		faCloudDownloadAlt, faCloudUploadAlt,
		faArchive, faImage, faEdit, faCopy, faLock, faFileExport, faTrash, faPlus,
} from '@fortawesome/free-solid-svg-icons';
// modules
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';
import { NavigatorModule } from './navigator/navigator.module';
// configs
import { FileManagerComponent } from './manager/file-manager.component';
import { NFMConfig, DEFAULT_FILE_MANAGER_CONFIG, FileManagerConfig, NFMDefaultConfig } from './shared/models/config.model';

export function configFactory(config: FileManagerConfig) {
	return Object.assign({}, DEFAULT_FILE_MANAGER_CONFIG, config);
}

@NgModule({
	imports: [
		CommonModule,
		NgxsModule.forFeature([
			NavigatorState,
			PathState
		]),
		// modules
		SidebarModule,
		NavbarModule,
		NavigatorModule
	],
	declarations: [
		FileManagerComponent
	],
	exports: [
		FileManagerComponent
	]
})
export class VbFileManagerModule {
	static forRoot(config: FileManagerConfig = DEFAULT_FILE_MANAGER_CONFIG): ModuleWithProviders {
		return {
			ngModule: VbFileManagerModule,
			providers: [
				{ provide: NFMDefaultConfig, useValue: config },
				{ provide: NFMConfig, useFactory: configFactory, deps: [NFMDefaultConfig] }
			]
		};
	}

	constructor() {
		library.add(faChevronLeft, faChevronRight, faChevronDown,
			faFolder, faFile, faFolderOpen, faFileSignature,
			faEllipsisV, faSearch, faThList, faThLarge,
			faLongArrowAltUp, faLongArrowAltDown, faArrowAltCircleLeft, faArrowRight, faArrowsAlt,
			faHandPointRight, faHandPointUp, faLayerGroup,
			faTimes, faCheckCircle, faBan, faExclamationTriangle,
			faCloudDownloadAlt, faCloudUploadAlt,
			faArchive, faImage, faEdit, faCopy, faLock, faFileExport, faTrash, faPlus);
	}
}
