import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// modules
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgbModalModule, NgbAlertModule, NgbProgressbarModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VbAlertModule } from '@vonbraunlabs/alert';
import { VbCommonModule } from '@vonbraunlabs/common';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SharedModule } from '../shared/shared.module';
// components
import { FileNavigatorComponent } from './containers/navigator/navigator.component';
import { FileContextMenuComponent } from './containers/context-menu/context-menu.component';
import { FileDropZoneComponent } from './components/file-drop-zone/file-drop-zone.component';
import { PathSelectorComponent } from './containers/path-selector/path-selector.component';
import { FolderNavigatorComponent } from './components/folder-navigator/folder-navigator.component';
import { FileComponent } from './components/file/file.component';
import { NoFilesComponent } from './components/no-files/no-files.component';
import { SelectedFilesComponent } from './components/selected-files/selected-files.component';
// modals
import { CreateFolderModalComponent } from './modals/create-folder/create-folder.component';
import { CompressModalComponent } from './modals/compress/compress.component';
import { CopyModalComponent } from './modals/copy/copy.component';
import { EditModalComponent } from './modals/edit/edit.component';
import { ExtractModalComponent } from './modals/extract/extract.component';
import { ModalComponent } from './modals/modal/modal.component';
import { MoveModalComponent } from './modals/move/move.component';
import { PermissionsModalComponent } from './modals/permissions/permissions.component';
import { PreviewModalComponent } from './modals/preview/preview.component';
import { RemoveModalComponent } from './modals/remove/remove.component';
import { RenameModalComponent } from './modals/rename/rename.component';
import { SelectorModalComponent } from './modals/selector/selector.component';
import { UploadModalComponent } from './modals/upload/upload-folder.component';
// pipes
import { FileExtensionPipe } from './pipes/file-extension.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FullPathPipe } from './pipes/fullpath.pipe';
import { FileTitlePipe } from './pipes/file-title.pipe';
import { UrlPipe } from './pipes/url.pipe';

const modals = [
	CompressModalComponent,
	CopyModalComponent,
	CreateFolderModalComponent,
	EditModalComponent,
	ExtractModalComponent,
	ModalComponent,
	MoveModalComponent,
	PermissionsModalComponent,
	PreviewModalComponent,
	RemoveModalComponent,
	RenameModalComponent,
	SelectorModalComponent,
	UploadModalComponent
];

@NgModule({
	imports: [
		FormsModule,
		NgbAlertModule,
		NgbModalModule,
		NgbProgressbarModule,
		NgbButtonsModule,
		ContextMenuModule.forRoot({
			autoFocus: true,
			useBootstrap4: true
		}),
		DragDropModule,
		VbAlertModule,
		VbCommonModule,
		BreadcrumbModule,
		SharedModule
	],
	declarations: [
		FileNavigatorComponent,
		FileComponent,
		FileContextMenuComponent,
		FileDropZoneComponent,
		FolderNavigatorComponent,
		NoFilesComponent,
		// pipes
		FileExtensionPipe,
		FileSizePipe,
		FileTitlePipe,
		FullPathPipe,
		UrlPipe,
		// helpers
		PathSelectorComponent,
		SelectedFilesComponent,
		// modals
		...modals
	],
	exports: [
		FileNavigatorComponent
	],
	entryComponents: [
		...modals
	]
})
export class NavigatorModule {}
