import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditNgonnguComponent } from './create-or-edit-ngonngu/create-or-edit-ngonngu.component';

@Component({
  selector: 'app-ngon-ngu',
  templateUrl: './ngon-ngu.component.html',
  styleUrls: ['./ngon-ngu.component.css'],
  animations: [appModuleAnimation()]
})
export class NgonNguComponent extends AppComponentBase implements OnInit {
  public languages: LanguageDto[] = [];
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
    private _languageService: LanguageServiceProxy,
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
    this._languageService.getAll(this.keyword,this.sorting, this.skipCount, this.pageSize)
      .subscribe((result) => {
        this.languages = result.items;
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
      this.l('Bạn có muốn xóa ngôn ngữ', language.clientName),
      this.l('Bạn chắc chắn'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._languageService.delete(language.id)
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
       createOrEditGrade = this._dialog.open(CreateOrEditNgonnguComponent);
      } else {
        createOrEditGrade = this._dialog.open(CreateOrEditNgonnguComponent, {
          data: id
        });
      }
      createOrEditGrade.afterClosed().subscribe(result => {
        this.getAll();
    });
    }
    export(){}
}

