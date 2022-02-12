import { Component, ElementRef, Inject, Injector, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { AppComponentBase } from '@shared/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { ConfigEmailSenderServiceProxy, EmployeeServiceProxy, LanguageDto, LanguageServiceProxy, SenJDForCustomerDto } from '@shared/service-proxies/service-proxies';
import { IAjaxResponse } from 'abp-ng2-module/dist/src/abpHttpInterceptor';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-send-jd',
  templateUrl: './send-jd.component.html',
  styleUrls: ['./send-jd.component.css']
})
export class SendJDComponent extends AppComponentBase implements OnInit, OnDestroy {
  @ViewChild('documentFileInput', { static: true }) documentFileInput: ElementRef;
  documentUploader: FileUploader;
  _uploaderOptions: FileUploaderOptions = {};
  htmlContent: string;
  public isLoading = false;
  isSelectedFile = false;
  fileName: any;
  contentType: any;
  public language: LanguageDto = new LanguageDto();
  saving = false;
  startDate = new Date();
  Bcc: any;
  email: SenJDForCustomerDto = new SenJDForCustomerDto();
  checklstemail = false;

  urlDeleteFile = AppConsts.remoteServiceBaseUrl + '/Profile/DeleteFileJD';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    // toolbarHiddenButtons: [
    //   ['bold'}
    // ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<SendJDComponent>,
    private _configToSendEmailService: ConfigEmailSenderServiceProxy,
    private _tokenService: TokenService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,

  ) {
    super(injector);
  }
  ngOnDestroy(): void {
    if (this.fileName) {
      this._employeeService.deleteFileJD(this.fileName).subscribe(() => { });
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this._employeeService.getListEmail(this.data).subscribe(result => {
        this.email.toMail = result;
      });
    }
    this.initUploaders();
  }
  save() {
    if (this.fileName) {
      this.email.jdName = this.fileName;
      this.email.isAttackJD = true;
    }
    console.log('ádfasdfa', this.email.content, this.htmlContent);
    this._configToSendEmailService.sendJDForCustomer(this.email)
      .pipe(finalize(() => this.saving = false))
      .subscribe(result => {
        this.saving = true;
        abp.notify.success(this.l('Gửi JD thành công.'));
        this.close(true);
      });
  }
  close(result: any): void {
    this.saving = false;
    this.isSelectedFile = false;
    this.checklstemail = false;
    this.language = new LanguageDto();
    this.dialogRef.close(result);
  }
  selectFile($event) {
    if (this.documentFileInput) {
      this.documentFileInput.nativeElement.click();
    }
  }
  initUploaders(): void {
    this.documentUploader = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/Profile/UploadFileJD' });
    this._uploaderOptions.autoUpload = true;
    this._uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    this._uploaderOptions.removeAfterUpload = true;
    this.documentUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.documentUploader.onSuccessItem = (item, response) => {

      const resp = <IAjaxResponse>JSON.parse(response);
      if (!resp.result.errorInfo) {
        this.fileName = resp.result.fileName;
        this.contentType = resp.result.contentType;
        this.isSelectedFile = true;
      } else {
        this.message.error(resp.result.errorInfo.details, resp.result.errorInfo.message);
      }
    };
    this.documentUploader.setOptions(this._uploaderOptions);
  }
  validationEmail(lstemail: string) {
    if (lstemail.length > 0) {
      // kiểm tra xem kí tự cuối cùng của dãy có phải là ; hay không, nếu có thì xóa đi ra khỏi dãy
      const final = lstemail[lstemail.length - 1];
      if (final === ';') {
        lstemail = lstemail.substring(0, lstemail.length - 1);
      }
      const emails = lstemail.trim().split(';');
      this.checklstemail = emails.some(email =>
        this.validateEmail(email.trim())
      );
      return this.checklstemail;
    } else {
      this.checklstemail = false;
    }
  }
  // hàm kiểm tra xem đầu vào có phải email không ?
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = !re.test(email);
    return result;
  }
}

