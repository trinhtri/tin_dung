import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialog, Sort } from '@angular/material';
import { EmployeeServiceProxy, EmployeeListDto } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCVComponent } from './create-or-edit-cv/create-or-edit-cv.component';
import { CVGuiDiComponent } from './cv-gui-di/cv-gui-di.component';
import { FileDownloadService } from '@shared/Utils/file-download.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  animations: [appModuleAnimation()]
})
export class CVComponent  extends AppComponentBase implements OnInit {
  public employees: EmployeeListDto[] = [];
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
    private _clientService: EmployeeServiceProxy,
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
    this._clientService.getAll(this.keyword, this.startDate, this.endDate, this.sorting, this.skipCount, this.pageSize)
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
      this.l('Bạn chắc chắn'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._clientService.delete(client.id)
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
    showGuiCV(id?: any) {
      let createOrEditGrade;
      if (id === null || id === undefined) {
       createOrEditGrade = this._dialog.open(CVGuiDiComponent);
      } else {
        createOrEditGrade = this._dialog.open(CVGuiDiComponent, {
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
    dowload_CV(employee) {
      this._clientService.downloadTempAttachment(employee.id).subscribe(result => {
        if (result.fileName) {
          this._fileDownLoadService.downloadTempFile(result);
        } else {
          this.message.error(this.l('RequestedFileDoesNotExists'));
        }
      });
    }
    export() {
      if (this.startDate == null) {
        this.startDate = undefined;
      }
      if (this.endDate == null) {
        this.endDate = undefined;
      }
      this._clientService.getCVToExcel(this.keyword, this.startDate, this.endDate, this.sorting, this.skipCount, this.pageSize)
        .subscribe((result) => {
         this._fileDownLoadService.downloadTempFile(result);
        }, (error) => {
          this.isTableLoading = false;
        });
    }
}
