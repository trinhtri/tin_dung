import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeListDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCVComponent } from '@app/cv/create-or-edit-cv/create-or-edit-cv.component';
import { Sort, MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CVGuiDiComponent } from '@app/cv/cv-gui-di/cv-gui-di.component';
import { FileDownloadService } from '@shared/Utils/file-download.service';
import { HenPVComponent } from '@app/cv/hen-pv/hen-pv.component';
@Component({
  selector: 'app-cv-ung-vien-gui',
  templateUrl: './cv-ung-vien-gui.component.html',
  styleUrls: ['./cv-ung-vien-gui.component.css'],
  animations: [appModuleAnimation()]

})
export class CVUngVienGuiComponent extends AppComponentBase implements OnInit {
  public employees: EmployeeListDto[] = [];
  public pageSize = 10;
  public pageNumber = 1;
  public totalPages = 1;
  public totalItems: number;
  public keyword: string;
  public isTableLoading = false;
  ketQua: any;
  startDate: any;
  endDate: any;
  startNgaypv: any;
  endNgaypv: any;
  private sorting = undefined;
  private skipCount = (this.pageNumber - 1) * this.pageSize;
  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    private _fileDownLoadService: FileDownloadService,
    private _dialog: MatDialog) {
      super(injector);
    }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.skipCount = (this.pageNumber - 1) * this.pageSize;
    this.isTableLoading = true;
    if (this.startDate == null) {
      this.startDate = undefined;
    }
    if (this.endDate == null) {
      this.endDate = undefined;
    }
    if (this.startNgaypv == null) {
      this.startNgaypv = undefined;
    }
    if (this.endNgaypv == null) {
      this.endNgaypv = undefined;
    }
    this._employeeService.getAll_Gui(this.keyword, this.ketQua, this.startDate, this.endDate ,
       this.startNgaypv, this.endNgaypv, this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this.employees = result.items;
        this.totalItems = result.totalCount;
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.isTableLoading = false;
      }, (error) => {
        this.isTableLoading = false;
      });
  }

  getDataPage(page: number): void {
    this.skipCount = (page - 1) * this.pageSize;
    this.pageNumber = page;
    this.getAll();
  }


  delete(client) {
    this.message.confirm(
      this.l('Bạn có muốn xóa CV', client.clientName),
      this.l('Bạn chắc chắn xóa'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._employeeService.delete(client.id)
            .subscribe(result => {
              this.getAll();
              this.notify.info(this.l('Xóa thành công'));
            }
            );
        }
      }
    );
  }

  sortData(sort: Sort) {
    this.sorting = sort.active + ' ' + sort.direction;
    this.getAll();
  }

  resetPanigation() {
    this.skipCount = 0;
  }

  onChangedPanigation(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.getAll();
  }
  createCV() {
    this.showAddOrEditClient();
  }
  editCV(CV) {
    this.showAddOrEditClient(CV.id);
  }
    showAddOrEditClient(id?: any) {
      let createOrEditGrade;
      if (id === null || id === undefined) {
       createOrEditGrade = this._dialog.open(CVGuiDiComponent);
      } else {
        createOrEditGrade = this._dialog.open(CVGuiDiComponent, {
          data: id
        });
      }
      createOrEditGrade.afterClosed().subscribe(result => {
        this.getAll();
    });
    }
    showAddOrEditPV(id) {
      let createOrEditGrade;
        createOrEditGrade = this._dialog.open(HenPVComponent, {
          data: id
        });
      createOrEditGrade.afterClosed().subscribe(result => {
        this.getAll();
    });
    }

    // trong trường hợp CV đã được cty nhận
    approve(employee) {
      this._employeeService.daNhan(employee.id).subscribe(result => {
        abp.notify.success(this.l('Cập nhật CV thành công'));
        this.getAll();
      });
    }
    discard(employee) {
      this._employeeService.huyNhan(employee.id).subscribe(result => {
        abp.notify.success(this.l('Cập nhật CV thành công'));
        this.getAll();
      });
    }
    chuyenVeQLCV(employee) {
      // employee.trangThai = false;
      // employee.ngayHoTro = null;
      // employee.ctyNhan = null;
      this._employeeService.chuyenVeQLCV(employee.id).subscribe(result => {
        abp.notify.success(this.l('Chuyển CV thành công'));
        this.getAll();
      });
    }
    exportExcel() {
      this.skipCount = (this.pageNumber - 1) * this.pageSize;
    this.isTableLoading = true;
    if (this.startDate == null) {
      this.startDate = undefined;
    }
    if (this.endDate == null) {
      this.endDate = undefined;
    }
    if (this.startNgaypv == null) {
      this.startNgaypv = undefined;
    }
    if (this.endNgaypv == null) {
      this.endNgaypv = undefined;
    }
    this._employeeService.getGuiCVToExcel(this.keyword, this.ketQua, this.startDate, this.startNgaypv, this.endNgaypv,
      this.endDate , this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
       this._fileDownLoadService.downloadTempFile(result);
        this.isTableLoading = false;
      }, (error) => {
        this.isTableLoading = false;
      });
    }
}
