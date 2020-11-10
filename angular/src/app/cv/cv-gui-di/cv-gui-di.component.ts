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
  public CV: CreateEmployeeDto = new CreateEmployeeDto();
  saving = false;
  ngayPV: any;
  constructor(injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private dialogRef: MatDialogRef<CVGuiDiComponent>,
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
    this.ngayPV = this.CV.ngayPhongVan.toDate();
  });
  }
    save() {
      this.saving = true;
      this.CV.trangThai = true;
      this.CV.ketQua = false;
      if(this.ngayPV){
        this.CV.ngayPhongVan = moment(this.ngayPV);
      }
      if (this.CV.id) {
        this._EmployeeService.guiCV(this.CV.id, this.CV.ctyNhan,this.ngayPV)
          .subscribe(() => {
            abp.notify.success(this.l('Lưu thành công.'));
            this.close(true);
          });
    }
  }
    close(result: any): void {
      this.saving = false;
      this.ngayPV = null;
      this.CV = new CreateEmployeeDto();
      this.dialogRef.close(result);
    }
  }
