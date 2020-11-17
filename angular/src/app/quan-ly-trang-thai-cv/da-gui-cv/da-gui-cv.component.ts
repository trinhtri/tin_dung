import { Observable } from 'rxjs';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeListDto, EmployeeServiceProxy, LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';
import { Sort, MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CVGuiDiComponent } from '@app/cv/cv-gui-di/cv-gui-di.component';
import { FileDownloadService } from '@shared/Utils/file-download.service';
import { HenPVComponent } from '@app/cv/hen-pv/hen-pv.component';
import { SendJDComponent } from '@app/cv/send-jd/send-jd.component';
import * as moment from 'moment';
import { EmployeeService } from '@app/employee.service';
@Component({
  selector: 'app-da-gui-cv',
  templateUrl: './da-gui-cv.component.html',
  styleUrls: ['./da-gui-cv.component.css'],
  animations: [appModuleAnimation()]
})
export class DaGuiCVComponent extends AppComponentBase implements OnInit, OnDestroy {

  public employees: EmployeeListDto[] = [];
  public pageSize = 25;
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
  trangthai: number;
  languageSelected: number[] = [];
  certificateSelected: string[] = [];
  checkedAll: false;
  languages: LanguageDto[] = [];
  selectedRecordId: number[] = [];
  allRecordId: number[] = [];
  private sorting = undefined;
  private skipCount = (this.pageNumber - 1) * this.pageSize;

  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    private _fileDownLoadService: FileDownloadService,
    private _languageService: LanguageServiceProxy,
    private _employeeClientService: EmployeeService,
    private _dialog: MatDialog) {
    super(injector);
  }
  ngOnInit() {
    this.getAll();
    this.initData();
    this._employeeClientService.observableEvent_Click_GuiCV.subscribe(result => {
      if (result === true) {
        this.getAll();
      }
    });
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  initData() {
    // get languges
    this._languageService.getAll(undefined, undefined, 0, 10000000).subscribe(result => {
      this.languages = result.items;
    });
  }
  filter(data) {
    this.languageSelected = data.value;
    this.getAll();
  }
  filterbyCertificate(data) {
    console.log(data.value);
    this.certificateSelected = data.value;
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
    this._employeeService.getAll_Gui(
      this.keyword,
      2,
      this.startDate,
      this.endDate,
      this.startNgaypv,
      this.endNgaypv,
      this.certificateSelected,
      this.languageSelected,
      this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this.employees = result.items;
        this.totalItems = result.totalCount;
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.selectedRecordId = [];
        this.checkedAll = false;
        result.items.forEach(i => {
          this.allRecordId.push(i.id);
        });


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
      this._employeeClientService.clickHenPV(true);
    });
  }

  chuyenVeQLCV(employee) {
    this._employeeService.chuyenVeQLCV(employee.id).subscribe(result => {
      abp.notify.success(this.l('Chuyển CV thành công'));
      this.getAll();
      this._employeeClientService.clickVeMoi(true);
    });
  }
  dowload_CV(employee) {
    this._employeeService.downloadTempAttachment(employee.id).subscribe(result => {
      if (result.fileName) {
        this._fileDownLoadService.downloadTempFile(result);
      } else {
        this.message.error(this.l('RequestedFileDoesNotExists'));
      }
    });
  }
  onCheckboxChanged(id: number, e: any) {
    if (e.checked) {
      if (!this.selectedRecordId.includes(id)) {
        this.selectedRecordId.push(id);
      }
    } else {
      const position = this.selectedRecordId.indexOf(id);
      // tslint:disable-next-line:no-bitwise
      if (~position) {
        this.selectedRecordId.splice(position, 1);
      }
    }
    console.log('selectedRecordId', this.selectedRecordId);
  }
  onAllCheckboxChanged(e: any) {
    if (e) {
      this.selectedRecordId = Object.assign([], this.allRecordId);
    } else {
      this.selectedRecordId = [];
    }
    console.log('selectedRecordId', this.selectedRecordId);
  }
  getPhone(input) {
    return 'tel:' + input;
  }
  SendJD() {
    let createOrEditGrade;
    createOrEditGrade = this._dialog.open(SendJDComponent, {
      data: this.selectedRecordId
    });
    createOrEditGrade.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  export() {
    let start;
    let end;
    if (this.startDate == null) {
      start = undefined;
    } else {
      this.startDate.setHours(0, 0, 0, 1);
      start = moment(this.startDate);
    }
    if (this.endDate == null) {
      end = undefined;
    } else {
      this.endDate.setHours(23, 59, 59, 59);
      end = moment(this.endDate);
    }
    this._employeeService.getCVToExcel(this.keyword, [2], start, end, this.certificateSelected,
      this.languageSelected, this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this._fileDownLoadService.downloadTempFile(result);
      }, (error) => {
        this.isTableLoading = false;
      });
  }
  CV_Gui(CV) {
    this.showGuiCV(CV.id);
  }
  showGuiCV(id?: any) {
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
  getEmail(input) {
    return 'mailto:' + input;
  }
}
