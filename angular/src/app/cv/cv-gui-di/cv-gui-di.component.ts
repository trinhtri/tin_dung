import { Component, OnInit, Injector, Inject, Optional } from '@angular/core';
import { CreateEmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';
@Component({
  selector: 'app-cv-gui-di',
  templateUrl: './cv-gui-di.component.html',
  styleUrls: ['./cv-gui-di.component.css']
})
export class CVGuiDiComponent extends AppComponentBase implements OnInit {
  ngayHoTro: any;
  public isLoading = false;
  saving = false;
  ngayPV: any;
  id: number;
  ctyNhans: string;
  status: number;
  constructor(injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<CVGuiDiComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    console.log('data', this.data.status , this.data.id);
    this.id = + this.data.id;
    if (this.data.id && this.data.status == false) {
      console.log('vào')
      this.getSendCV(this.data.id);
    }
  }
  getSendCV(id) {
    this._EmployeeService.getSendCV(id).subscribe(result => {
      this.ctyNhans = result.tenCty;
    });
  }
  save() {
    this.saving = true;
    if(this.data.status == false){
      this._EmployeeService.updateSendCV(+this.id, this.ctyNhans)
      .subscribe(() => {
        abp.notify.success(this.l('Lưu thành công.'));
        this.close(true);
      });
    } else {
      this._EmployeeService.guiCV(+this.id, this.ctyNhans)
      .subscribe(() => {
        abp.notify.success(this.l('Lưu thành công.'));
        this.close(true);
      });
    }

  }
  close(result: any): void {
    this.saving = false;
    this.ngayPV = null;
    this.dialogRef.close(result);
  }
}
