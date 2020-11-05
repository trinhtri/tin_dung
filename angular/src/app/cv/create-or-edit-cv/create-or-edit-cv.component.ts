import { LanguageServiceProxy } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Injector, Optional, Inject, ElementRef, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';
import { CreateEmployeeDto, EmployeeServiceProxy, LanguageDto } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { IAjaxResponse } from 'abp-ng2-module/dist/src/abpHttpInterceptor';
import { AppConsts } from '@shared/AppConsts';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';

@Component({
  selector: 'app-create-or-edit-cv',
  templateUrl: './create-or-edit-cv.component.html',
  styleUrls: ['./create-or-edit-cv.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateOrEditCVComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  @ViewChild('documentFileInput', {static: true}) documentFileInput: ElementRef;
  isSelectedFile = false;
  documentUploader: FileUploader;
  _uploaderOptions: FileUploaderOptions = {};
  public CV: CreateEmployeeDto = new CreateEmployeeDto();
  saving = false;
  startDate = new Date();
  languages: LanguageDto[] = [];
  languageSelected: any;
  checked: any;
  constructor(injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private _languageService: LanguageServiceProxy,
    private _tokenService: TokenService,
    private dialogRef: MatDialogRef<CreateOrEditCVComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
      super(injector);
     }

     ngOnInit(): void {
      this.initUploaders();
      if (this.data) {
      this.getClient(this.data);
      }
    }
  getClient(id) {
  this._EmployeeService.getId(id).subscribe( result => {
    this.CV = result;
    this.startDate = this.CV.ngayNhanCV.toDate();
  });
  }
  selectFile($event) {
    if (this.documentFileInput) {
      this.documentFileInput.nativeElement.click();
    }
  }
  filter(data) {
    this.languageSelected = data;
    console.log(this.CV.languages);
  }
  initUploaders(): void {
    this.documentUploader = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/Profile/UploadDocumentFile' });
    this._uploaderOptions.autoUpload = true;
    this._uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    this._uploaderOptions.removeAfterUpload = true;
    this.documentUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.documentUploader.onSuccessItem = (item, response) => {

      const resp = <IAjaxResponse>JSON.parse(response);
      if (!resp.result.errorInfo) {
        this.CV.cvName = resp.result.fileName;
        this.CV.contentType = resp.result.contentType;
        this.isSelectedFile = true;
      } else {
        this.message.error(resp.result.errorInfo.details, resp.result.errorInfo.message);
      }
    };
    this.documentUploader.setOptions(this._uploaderOptions);

    // get languges
    this._languageService.getAll(undefined, undefined, 0, 10000000).subscribe(result => {
      this.languages = result.items;
      console.log('languages', this.languages);
    });

  }
    save() {
      this.CV.languages = this.languageSelected.value;
      this.CV.trangThai = false;
      this.CV.ngayNhanCV = moment(this.startDate);
      this.saving = true;
      this.CV.isSeletedFile = this.isSelectedFile;
      if (this.CV.id) {
        this._EmployeeService.update(this.CV)
          .subscribe(() => {
            abp.notify.success(this.l('Chỉnh sửa thành công.'));
            this.close(true);
          });
      } else {
        this._EmployeeService.create(this.CV)
          .subscribe(() => {
            abp.notify.success(this.l('Tạo mới thành công.'));
            this.close(true);
          });
      }
    }
    close(result: any): void {
      this.startDate = new Date();
      this.saving = false;
      this.isSelectedFile = false;
      this.startDate = null;
      this.CV = new CreateEmployeeDto();
      this.dialogRef.close(result);
    }
    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy() {
      this.deleteTempFile();
    }
    deleteTempFile() {
      if (this.CV.cvName) {
        this._EmployeeService.deleteDocumentTempFile(this.CV.cvName).subscribe();
      }
    }
}
