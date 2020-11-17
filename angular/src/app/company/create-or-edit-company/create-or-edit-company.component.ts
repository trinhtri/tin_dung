import { CreateCompanyDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, ElementRef, Inject, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { CompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { IAjaxResponse } from 'abp-ng2-module/dist/src/abpHttpInterceptor';
import { AppConsts } from '@shared/AppConsts';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';

@Component({
  selector: 'app-create-or-edit-company',
  templateUrl: './create-or-edit-company.component.html',
  styleUrls: ['./create-or-edit-company.component.css']
})
export class CreateOrEditCompanyComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  isSelectedFile = false;
  public company: CreateCompanyDto = new CreateCompanyDto();
  saving = false;
  startDate = new Date();

  @ViewChild('documentFileInput', {static: true}) documentFileInput: ElementRef;
  @ViewChild('documentFileInputTT', {static: true}) documentFileInputTT: ElementRef;

  documentUploader: FileUploader;
  documentUploaderTT: FileUploader;

  _uploaderOptions: FileUploaderOptions = {};
  _uploaderOptionsTT: FileUploaderOptions = {};


  constructor(injector: Injector,
    private _companyService: CompanyServiceProxy,
    private dialogRef: MatDialogRef<CreateOrEditCompanyComponent>,
    private _tokenService: TokenService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,

  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.data) {
      this.getClient(this.data);
      this.initUploaders();
      this.initTT();
    }
  }
  selectFileHD($event) {
    if (this.documentFileInput) {
      this.documentFileInput.nativeElement.click();
    }
  }

  selectFileTT($event) {
    if (this.documentFileInputTT) {
      this.documentFileInputTT.nativeElement.click();
    }
  }

  initUploaders(): void {
    this.documentUploader = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/Profile/UploadFileHopDong' });

    this._uploaderOptions.autoUpload = true;
    this._uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    this._uploaderOptions.removeAfterUpload = true;
    this.documentUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.documentUploader.onSuccessItem = (item, response) => {
      const resp = <IAjaxResponse>JSON.parse(response);
      if (!resp.result.errorInfo) {
        this.company.hopDong = resp.result.fileName;
        this.company.contentTypeHD = resp.result.contentType;
        this.company.isSelectHD = true;
      } else {
        this.message.error(resp.result.errorInfo.details, resp.result.errorInfo.message);
      }
    };
    this.documentUploader.setOptions(this._uploaderOptions);


  }
  initTT() {
    this._uploaderOptionsTT.autoUpload = true;
    this._uploaderOptionsTT.authToken = 'Bearer ' + this._tokenService.getToken();
    this._uploaderOptionsTT.removeAfterUpload = true;

    this.documentUploaderTT = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/Profile/UploadFileThanhToan' });
    this.documentUploaderTT.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.documentUploaderTT.onSuccessItem = (item, response) => {
      const resp = <IAjaxResponse>JSON.parse(response);
      if (!resp.result.errorInfo) {
        this.company.thanhToan = resp.result.fileName;
        this.company.contentTypeTT = resp.result.contentType;
        this.company.isSelectTT = true;
      } else {
        this.message.error(resp.result.errorInfo.details, resp.result.errorInfo.message);
      }
    };
    this.documentUploaderTT.setOptions(this._uploaderOptionsTT);
  }
  getClient(id) {
    this._companyService.getId(id).subscribe(result => {
      this.company = result;
    });
  }
  save() {
    this.saving = true;
    if (this.company.id) {
      this._companyService.update(this.company)
        .subscribe(() => {
          abp.notify.success(this.l('Chỉnh sửa thành công.'));
          this.close(true);
        });
    } else {
      this._companyService.create(this.company)
        .subscribe(() => {
          abp.notify.success(this.l('Tạo mới thành công.'));
          this.close(true);
        });
    }
  }
  close(result: any): void {
    this.saving = false;
    this.isSelectedFile = false;
    this.company = new CreateCompanyDto();
    this.dialogRef.close(result);
  }
}
