import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateEmployeeDto, EmployeeServiceProxy, LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-edit-ngonngu',
  templateUrl: './create-or-edit-ngonngu.component.html',
  styleUrls: ['./create-or-edit-ngonngu.component.css'],
  animations: [appModuleAnimation()]

})
export class CreateOrEditNgonnguComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  isSelectedFile = false;
  public language: LanguageDto = new LanguageDto();
  saving = false;
  startDate = new Date();
  constructor(injector: Injector,
    private _languageService: LanguageServiceProxy,
    private dialogRef: MatDialogRef<CreateOrEditNgonnguComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,

    ) {
      super(injector);
     }

     ngOnInit(): void {
      if (this.data) {
      this.getClient(this.data);
      }
    }
  getClient(id) {
  this._languageService.getId(id).subscribe( result => {
    this.language = result;
  });
  }
    save() {
      this.saving = true;
      if (this.language.id) {
        this._languageService.update(this.language)
          .subscribe(() => {
            abp.notify.success(this.l('Chỉnh sửa thành công.'));
            this.close(true);
          });
      } else {
        this._languageService.create(this.language)
          .subscribe(() => {
            abp.notify.success(this.l('Tạo mới thành công.'));
            this.close(true);
          });
      }
    }
    close(result: any): void {
      this.saving = false;
      this.isSelectedFile = false;
      this.language = new LanguageDto();
      this.dialogRef.close(result);
    }
}
