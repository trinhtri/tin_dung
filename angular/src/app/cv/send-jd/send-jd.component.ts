import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-send-jd',
  templateUrl: './send-jd.component.html',
  styleUrls: ['./send-jd.component.css']
})
export class SendJDComponent extends AppComponentBase implements OnInit {

  public isLoading = false;
  isSelectedFile = false;
  public language: LanguageDto = new LanguageDto();
  saving = false;
  startDate = new Date();
  constructor(injector: Injector,
    private _languageService: LanguageServiceProxy,
    private dialogRef: MatDialogRef<SendJDComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,

    ) {
      super(injector);
     }

     ngOnInit(): void {
      if (this.data) {
        console.log('Gửi JD', this.data);
      // this.getClient(this.data);
      }
    }
  getClient(id) {
  this._languageService.getId(id).subscribe( result => {
    this.language = result;
  });
  }
    save() {
      this.saving = true;
        this._languageService.create(this.language)
          .subscribe(() => {
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

}
