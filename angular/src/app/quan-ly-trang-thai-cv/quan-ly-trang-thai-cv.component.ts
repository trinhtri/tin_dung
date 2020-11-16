import { Component, Injector, OnInit } from '@angular/core';
import { EmployeeService } from '@app/employee.service';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeServiceProxy, GetTotalForManager } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-quan-ly-trang-thai-cv',
  templateUrl: './quan-ly-trang-thai-cv.component.html',
  styleUrls: ['./quan-ly-trang-thai-cv.component.css']
})
export class QuanLyTrangThaiCVComponent extends AppComponentBase implements OnInit {
  total = new GetTotalForManager();
  chung: string;
  dagui: string;
  pv: string;
  pvchuakq: string;
  danhan: string;
  constructor(injector: Injector,
    private _employeeClientService: EmployeeService,
    private _employeeService: EmployeeServiceProxy) {
    super(injector)
  }

  ngOnInit() {
    this.initData();

    this._employeeClientService.observableEvent_Click_VeMoi.subscribe(result => {
      if (result === true) {
        this.initData();
      }
    });

    this._employeeClientService.observableEvent_Click_GuiCV.subscribe(result => {
      if (result === true) {
        this.initData();
      }
    });

    this._employeeClientService.observableEvent_Click_HenPV.subscribe(result => {
      if (result === true) {
        this.initData();
      }
    });

    this._employeeClientService.observableEvent_Click_ChuaKQ.subscribe(result => {
      if (result === true) {
        this.initData();
      }
    });

    this._employeeClientService.observableEvent_Click_DaNhan.subscribe(result => {
      if (result === true) {
        this.initData();
      }
    });


  }
  initData() {
    this._employeeService.getTotalEmployeeForManager().subscribe(result => {
      this.total = result;
      console.log('total', this.total);
      this.chung = 'Quản lý chung (' + this.total.moi + ' )';
      this.dagui = 'Đã gửi CV (' + this.total.daGui + ' )';
      this.pv = 'Có lịch PV (' + this.total.coLichPV + ' )';
      this.pvchuakq = 'PV chưa có kết quả (' + this.total.pvChuaKQ + ' )';
      this.danhan = 'Đã nhận (' + this.total.daNhan + ' )';
    })
  }


}
