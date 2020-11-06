import { Component, ElementRef, Inject, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { ConfigEmailSenderServiceProxy, CreateConfigToSendMailDto, EmployeeServiceProxy, LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-send-jd',
  templateUrl: './send-jd.component.html',
  styleUrls: ['./send-jd.component.css']
})
export class SendJDComponent extends AppComponentBase implements OnInit {
  @ViewChild('documentFileInput', {static: true}) documentFileInput: ElementRef;
  public isLoading = false;
  isSelectedFile = false;
  public language: LanguageDto = new LanguageDto();
  saving = false;
  startDate = new Date();
  Bcc: any;
  fileJD: any;
  fileJD1: any;
  email: CreateConfigToSendMailDto = new CreateConfigToSendMailDto();
  constructor(injector: Injector,
    private _languageService: LanguageServiceProxy,
    private _employeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<SendJDComponent>,
    private _configToSendEmailService: ConfigEmailSenderServiceProxy,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,

    ) {
      super(injector);
     }

     ngOnInit(): void {
      if (this.data) {
        console.log('Gửi JD', this.data);
        this._employeeService.getListEmail(this.data).subscribe(result => {
        this.email.ccMail = result
        console.log('lst email' , this.Bcc);
        })
      }
    }
    save() {
      this.email.userName = 'thangtodau2210@gmail.com';
      this.email.passWord = 'trinhtri98';
      this.email.port = 587;
      this.email.serverURL = 'smtp.gmail.com';
      this.email.reportPath = this.fileJD;
      this.email.isAttackReport = true;
      this.email.reportPath = 'C:\Users\DELL\Downloads';
      this._configToSendEmailService.sendMailList(this.email)
      .pipe(finalize( () => this.saving = false))
      .subscribe(result => {
      this.saving = true;
        abp.notify.success(this.l('Gửi JD thành công.'));
        this.close(true);
      });
    }
    close(result: any): void {
      this.saving = false;
      this.isSelectedFile = false;
      this.language = new LanguageDto();
      this.dialogRef.close(result);
    }
    selectFile($event) {
      if (this.documentFileInput) {
        this.documentFileInput.nativeElement.click();
      }
    }
}
