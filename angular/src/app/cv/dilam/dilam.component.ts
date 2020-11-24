import { Component, OnInit, Injector, Inject, Optional } from '@angular/core';
import { CreateEmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';

@Component({
  selector: 'app-dilam',
  templateUrl: './dilam.component.html',
  styleUrls: ['./dilam.component.css']
})
export class DilamComponent  extends AppComponentBase implements OnInit {

  public isLoading = false;
  saving = false;
  ngayDiLam = new Date();
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  touchUi = false;
  public enableMeridian = false;
  constructor(injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<DilamComponent>,
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
    this._EmployeeService.getSendCV(id).subscribe(result => {
      if (result.ngayDiLam) {
        this.ngayDiLam = result.ngayDiLam.toDate();
      } else {
        this.ngayDiLam = undefined;
      }
    });
  }
  save() {
    this.saving = true;
    let ngay;
    if (this.ngayDiLam) {
      ngay = moment(this.ngayDiLam);
    } else {
      ngay = undefined;
    }
    this._EmployeeService.daNhan(this.data, ngay)
      .subscribe(() => {
        abp.notify.success(this.l('Lưu thành công.'));
        this.close(true);
      });
  }
  close(result: any): void {
    this.saving = false;
    this.ngayDiLam = null;
    this.dialogRef.close(result);
  }
}
