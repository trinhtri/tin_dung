import { CreateCompanyDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { CompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  constructor(injector: Injector,
    private _companyService: CompanyServiceProxy,
    private dialogRef: MatDialogRef<CreateOrEditCompanyComponent>,
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
