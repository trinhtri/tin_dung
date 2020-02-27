import { Component, OnInit, Injector, Optional, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';
import { CreateEmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-or-edit-cv',
  templateUrl: './create-or-edit-cv.component.html',
  styleUrls: ['./create-or-edit-cv.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateOrEditCVComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  public CV: CreateEmployeeDto = new CreateEmployeeDto();
  saving = false;
  startDate = new Date();
  constructor(injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<CreateOrEditCVComponent>,
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
  this._EmployeeService.getId(id).subscribe( result => {
    this.CV = result;
    this.startDate = this.CV.ngayNhanCV.toDate();
  });
  }
    save() {
      this.CV.trangThai = false;
      this.CV.ngayNhanCV = moment(this.startDate);
      this.saving = true;
      // this.client.startDate = moment(this.startDate);
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
      this.startDate = null;
      this.CV = new CreateEmployeeDto();
      this.dialogRef.close(result);
    }

}
