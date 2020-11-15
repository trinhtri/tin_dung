import { Component, OnInit, Injector, Inject, Optional } from '@angular/core';
import { CreateEmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';
@Component({
  selector: 'app-hen-pv',
  templateUrl: './hen-pv.component.html',
  styleUrls: ['./hen-pv.component.css']
})
export class HenPVComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  saving = false;
  ngayPV: any;
  showSpinners = true;
  showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  touchUi = false;
  public enableMeridian = false;
  constructor(injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<HenPVComponent>,
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
    this._EmployeeService.getId(id).subscribe(result => {
      if (result.ngayPhongVan) {
        this.ngayPV = result.ngayPhongVan.toDate();
      } else {
        this.ngayPV = undefined;
      }
    });
  }
  save() {
    this.saving = true;
    let ngay;
    if (this.ngayPV) {
      ngay = moment(this.ngayPV);
    } else {
      ngay = undefined;
    }
    this._EmployeeService.henPV(this.data, ngay)
      .subscribe(() => {
        abp.notify.success(this.l('Lưu thành công.'));
        this.close(true);
      });
  }
  close(result: any): void {
    this.saving = false;
    this.ngayPV = null;
    this.dialogRef.close(result);
  }

}
