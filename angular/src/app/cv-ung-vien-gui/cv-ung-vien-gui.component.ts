import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeListDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCVComponent } from '@app/cv/create-or-edit-cv/create-or-edit-cv.component';
import { Sort, MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';

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

  private sorting = undefined;
  private skipCount = (this.pageNumber - 1) * this.pageSize;
  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    private _dialog: MatDialog) {
      super(injector);
    }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.skipCount = (this.pageNumber - 1) * this.pageSize;
    this.isTableLoading = true;
    this._employeeService.getAll_Gui(this.keyword, this.sorting, this.skipCount, this.pageSize)
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
      this.l('AreYouSureWantToDelete', client.clientName),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._employeeService.delete(client.id)
            .subscribe(result => {
              this.getAll();
              this.notify.info(this.l('DeleteSuccessfully'));
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
       createOrEditGrade = this._dialog.open(CreateOrEditCVComponent);
      } else {
        createOrEditGrade = this._dialog.open(CreateOrEditCVComponent, {
          data: id
        });
      }
      // createOrEditGrade.componentInstance.onSaveAndAdd.subscribe(() => {
      //   this.getAll();
      // });
      createOrEditGrade.afterClosed().subscribe(result => {
        this.getAll();
    });
    }

    // trong trường hợp CV đã được cty nhận
    approve(employee) {
      employee.ketQua = true;
      this._employeeService.update(employee).subscribe(result => {
        abp.notify.success(this.l('SuccessfullyUpdated'));
        this.getAll();
      });
    }
    discard(employee) {
      employee.ketQua = false;
      this._employeeService.update(employee).subscribe(result => {
        abp.notify.success(this.l('SuccessfullyUpdated'));
        this.getAll();
      });
    }
    chuyenVeQLCV(employee) {
      employee.trangThai = false;
      employee.ngayHoTro = null;
      employee.ctyNhan = null;
      this._employeeService.update(employee).subscribe(result => {
        abp.notify.success(this.l('SuccessfullyUpdated'));
        this.getAll();
      });
    }
}
