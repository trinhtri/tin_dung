import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import { CVGuiDiComponent } from './cv/cv-gui-di/cv-gui-di.component';
import { ConfigEmailSenderServiceProxy, DashboardInterviewAppserviceServiceProxy, EmployeeServiceProxy, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';
import { CVComponent } from './cv/cv.component';
import { CreateOrEditCVComponent } from './cv/create-or-edit-cv/create-or-edit-cv.component';
import { CVUngVienGuiComponent } from './cv-ung-vien-gui/cv-ung-vien-gui.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { FileDownloadService } from '@shared/Utils/file-download.service';
import { NgonNguComponent } from './ngon-ngu/ngon-ngu.component';
import { CreateOrEditNgonnguComponent } from './ngon-ngu/create-or-edit-ngonngu/create-or-edit-ngonngu.component';
import { SendJDComponent } from './cv/send-jd/send-jd.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HenPVComponent } from './cv/hen-pv/hen-pv.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    CVComponent,
    CVGuiDiComponent,
    CreateOrEditCVComponent,
    CVUngVienGuiComponent,
    NgonNguComponent,
    CreateOrEditNgonnguComponent,
    SendJDComponent,
    HenPVComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MatDatepickerModule,
    FileUploadModule,
    FullCalendarModule
  ],
  providers: [
    EmployeeServiceProxy,
    FileDownloadService,
    LanguageServiceProxy,
    ConfigEmailSenderServiceProxy,
    DashboardInterviewAppserviceServiceProxy
  ],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    CreateOrEditCVComponent,
    CVGuiDiComponent,
    CreateOrEditNgonnguComponent,
    SendJDComponent,
    HenPVComponent
  ]
})
export class AppModule {}
