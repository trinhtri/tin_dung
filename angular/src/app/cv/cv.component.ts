import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialog, Sort } from '@angular/material';
import { EmployeeServiceProxy, EmployeeListDto, LanguageServiceProxy, LanguageDto } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCVComponent } from './create-or-edit-cv/create-or-edit-cv.component';
import { CVGuiDiComponent } from './cv-gui-di/cv-gui-di.component';
import { FileDownloadService } from '@shared/Utils/file-download.service';
import { SendJDComponent } from './send-jd/send-jd.component';
import * as moment from 'moment';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  animations: [appModuleAnimation()]
})
export class CVComponent extends AppComponentBase implements OnInit {
  public employees: EmployeeListDto[] = [];
  public pageSize = 50;
  public pageNumber = 1;
  public totalPages = 1;
  public totalItems: number;
  public keyword: string;
  public isTableLoading = false;
  startDate: any;
  endDate: any;
  selectedRecordId: number[] = [];
  allRecordId: number[] = [];
  checkedAll: false;
  bangCap: any;
  languageSelected: number[] = [];
  certificateSelected: string[] = [];
  trangthaiSelected: number[] = [];
  languages: LanguageDto[] = [];
  private sorting = undefined;
  private skipCount = (this.pageNumber - 1) * this.pageSize;
  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    private _fileDownLoadService: FileDownloadService,
    private _languageService: LanguageServiceProxy,
    private _dialog: MatDialog) {
    super(injector);
  }
  ngOnInit() {
    this.getAll();
    this.initData();
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
  filterbyStatus(data) {
    console.log(data.value);
    this.trangthaiSelected = data.value;
    this.getAll();
  }
  getAll() {
    this.skipCount = (this.pageNumber - 1) * this.pageSize;
    this.isTableLoading = true;
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

    this._employeeService.getAll(this.keyword, this.trangthaiSelected, start, end, this.certificateSelected, this.languageSelected,
      this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this.employees = result.items;
        this.totalItems = result.totalCount;
        console.log('employee', this.employees);
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.allRecordId = [];
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
      this.l('Bạn chắc chắn'),
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
  CV_Gui(CV) {
    this.showGuiCV(CV.id);
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
  showAddOrEditClient(id?: any) {
    let createOrEditGrade;
    if (id === null || id === undefined) {
      createOrEditGrade = this._dialog.open(CreateOrEditCVComponent);
    } else {
      createOrEditGrade = this._dialog.open(CreateOrEditCVComponent, {
        data: id
      });
    }
    createOrEditGrade.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  getPhone(input) {
    return 'tel:' + input;
  }
  getEmail(input) {
    return 'mailto:' + input;
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
  dowload_CV(employee) {
    this._employeeService.downloadTempAttachment(employee.id).subscribe(result => {
      if (result.fileName) {
        this._fileDownLoadService.downloadTempFile(result);
      } else {
        this.message.error(this.l('RequestedFileDoesNotExists'));
      }
    });
  }
  getBangCap(id) {
    switch (+id) {
      case 1:
        return 'Đại học';
        break;
      case 2:
        return 'Cao đẳng';
        break;
      case 3:
        return 'Trung cấp';
        break;
      case 4:
        return 'THPT';
        break;
      case 5:
        return 'Semon';
        break;
    }
  }
  getStatus(id) {
    switch (+id) {
      case 1:
        return 'Quản lý chung';
        break;
      case 2:
        return 'Đã gửi CV';
        break;
      case 3:
        return 'Có lịch PV';
        break;
      case 4:
        return 'PV chưa kết quả';
        break;
      case 5:
        return 'Đã nhận';
        break;
    }
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
    this._employeeService.getCVToExcel(this.keyword, undefined, start, end, this.certificateSelected,
      this.languageSelected, this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this._fileDownLoadService.downloadTempFile(result);
      }, (error) => {
        this.isTableLoading = false;
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
}
