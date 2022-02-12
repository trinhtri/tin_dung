import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('Lịch PV'), '', 'home', '/app/home'),
        new MenuItem(this.l('Quản lý CV'), 'Pages.Roles', 'people', '/app/cvs'),
        new MenuItem(this.l('Quản lý trạng thái CV'), 'Pages.Roles', 'send', '/app/cv_status'),
        new MenuItem(this.l('Quản lý công ty'), 'Pages.Roles', 'business', '/app/congty'),
        new MenuItem(this.l('Quản trị'), '', 'menu', '', [
            new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
            new MenuItem(this.l('Người dùng'), 'Pages.Users', '', '/app/users'),
            new MenuItem(this.l('Vui trò'), 'Pages.Roles', '', '/app/roles'),
            new MenuItem(this.l('Ngôn ngữ'), 'Pages.Roles', '', '/app/languages'),
        ])
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
