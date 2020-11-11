import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CVComponent } from './cv/cv.component';
import { CVGuiDiComponent } from './cv/cv-gui-di/cv-gui-di.component';
import { CVUngVienGuiComponent } from './cv-ung-vien-gui/cv-ung-vien-gui.component';
import { NgonNguComponent } from './ngon-ngu/ngon-ngu.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent },
                    { path: 'cvs', component: CVComponent, canActivate: [AppRouteGuard] },
                    { path: 'cv_gui', component: CVUngVienGuiComponent, canActivate: [AppRouteGuard] },
                    { path: 'languages', component: NgonNguComponent, canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
