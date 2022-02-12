import { EmployeeService } from './../../employee.service';
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
import { CreateOrEditCVComponent } from '@app/cv/create-or-edit-cv/create-or-edit-cv.component';
@Component({
  selector: 'app-cvmoi',
  templateUrl: './cvmoi.component.html',
  styleUrls: ['./cvmoi.component.css'],
  animations: [appModuleAnimation()]
})
export class CVMoiComponent extends AppComponentBase implements OnInit, OnDestroy {

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
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.getAll();
    this.initData();
    this._employeeClientService.observableEvent_Click_VeMoi.subscribe(result => {
      if (result === true) {
        this.getAll();
      }
    });
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
    console.log('ve moi');
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
    this._employeeService.getCVNew(
      this.keyword,
      1,
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
              this._employeeClientService.clickDeleteCV(true);
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
      createOrEditGrade = this._dialog.open(CreateOrEditCVComponent);
    } else {
      createOrEditGrade = this._dialog.open(CreateOrEditCVComponent, {
        data: id
      });
    }
    createOrEditGrade.afterClosed().subscribe(result => {
      this._employeeClientService.clickAddCV(true);
      this.getAll();
    });
  }
  showAddOrEditPV(id) {
    let createOrEditGrade;
    createOrEditGrade = this._dialog.open(HenPVComponent, {
      data: {
        id : id,
        status : 1
      }
    });
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
    this._employeeService.getCVNewToExcel( this.keyword,
      1,
      this.startDate,
      this.endDate,
      this.startNgaypv,
      this.endNgaypv,
      this.certificateSelected,
      this.languageSelected,
      this.sorting, this.skipCount, 100000000)
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
        data:  {id : id , status: true}
      });
    }
    createOrEditGrade.afterClosed().subscribe(result => {
      this.getAll();
      this._employeeClientService.clickGuiCV(true);
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
  getPhone(input) {
    return 'tel:' + input;
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
  getEmail(input) {
    return 'mailto:' + input;
  }
}
