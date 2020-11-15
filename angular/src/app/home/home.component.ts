import { DashboardInterviewAppserviceServiceProxy, GetEmployeeForChartDto } from './../../shared/service-proxies/service-proxies';
import { Component, Injector, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
// import Tooltip from 'tooltip.js';
import timeGrigPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import { EventInput } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
@Component({
    templateUrl: './home.component.html',
    animations: [appModuleAnimation()]
})
export class HomeComponent extends AppComponentBase implements OnInit {
    @ViewChild('fullcalendar', { static: true }) calendarComponent: FullCalendarComponent;

    calendarEvents: EventInput[] = [];

    calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

    calendarApi: Calendar;
    initialized = false;
    lstData: GetEmployeeForChartDto[] = [];
    constructor(injector: Injector,
        private _dashboardInterviewAppService: DashboardInterviewAppserviceServiceProxy
    ) {
        super(injector);
    }
    ngOnInit() {
    }
    initData() {
        this._dashboardInterviewAppService.getDataForDashboard().subscribe(result => {
            this.lstData = result;
        });
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewChecked() {
        this.calendarApi = this.calendarComponent.getApi();
        if (this.calendarApi && !this.initialized) {
            this.initialized = true;
            this.loadEvents();
        }
    }

    loadEvents() {
        this._dashboardInterviewAppService.getDataForDashboard().subscribe(result => {
            this.lstData = result;
            this.lstData.forEach(el => {
                const temp = {
                    id: el.id,
                    title: el.title,
                    start: el.start.toDate() ,
                    // allDay: true
                };
                console.log('temp', temp);
                this.calendarEvents.push(temp);
            });
            this.calendarApi.removeAllEventSources();
            this.calendarApi.addEventSource(this.calendarEvents);
        });
    }

    onDateClick(clickedDate: any) {
        console.log(clickedDate);
    }

    onEventClick(clickedEvent: any) {
        console.log(clickedEvent);
    }

    onEventRender(info: any) {
        console.log('onEventRender', info.el);
        //   const tooltip = new Tooltip(info.el, {
        //     title: info.event.title,
        //     placement: 'top-end',
        //     trigger: 'hover',
        //     container: 'body'
        //   });
    }
}
