import { CreateOrEditCompanyComponent } from './create-or-edit-company/create-or-edit-company.component';
import { CompanyListDto, CompanyServiceProxy, EmployeeServiceProxy } from './../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { FileDownloadService } from '@shared/Utils/file-download.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [appModuleAnimation()]
})
export class CompanyComponent extends AppComponentBase implements OnInit {

  public companys: CompanyListDto[] = [];
  public pageSize = 10;
  public pageNumber = 1;
  public totalPages = 1;
  public totalItems: number;
  public keyword: string;
  public isTableLoading = false;
  startDate: any;
  endDate: any;
  private sorting = undefined;
  private skipCount = (this.pageNumber - 1) * this.pageSize;
  constructor(injector: Injector,
    private _companyService: CompanyServiceProxy,
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
    this._companyService.getAll(this.keyword, this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this.companys = result.items;
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


  delete(language) {
    this.message.confirm(
      this.l('Bạn có muốn xóa công ty', language.clientName),
      this.l('Bạn chắc chắn'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._companyService.delete(language.id)
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
       createOrEditGrade = this._dialog.open(CreateOrEditCompanyComponent);
      } else {
        createOrEditGrade = this._dialog.open(CreateOrEditCompanyComponent, {
          data: id
        });
      }
      createOrEditGrade.afterClosed().subscribe(result => {
        this.getAll();
    });
    }
    export() {}

    getEmail(input) {
      return 'mailto:' + input;
    }

    getPhone(input) {
      return 'tel:' + input;
    }
    dowload_HD(company) {
      this._companyService.downloadHD(company.id).subscribe(result => {
        if (result.fileName) {
          this._fileDownLoadService.downloadTempFileHD(result);
        } else {
          this.message.error(this.l('RequestedFileDoesNotExists'));
        }
      });
    }

    dowload_TT(company) {
      this._companyService.downloadTT(company.id).subscribe(result => {
        if (result.fileName) {
          this._fileDownLoadService.downloadTempFileTT(result);
        } else {
          this.message.error(this.l('RequestedFileDoesNotExists'));
        }
      });
    }
}
