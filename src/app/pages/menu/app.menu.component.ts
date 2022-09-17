import {Component, OnInit} from '@angular/core';
import {MenuService} from './app.menu.service'
@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(private Menu: MenuService) {}

   async ngOnInit() {

        if(sessionStorage.getItem('user') =='admin'){
            this.model = [
                {
                    label: 'Main', icon: 'pi pi-fw pi-star', routerLink: ['/home'],
                    items: [
                        {label: 'Pet', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/Pet']},
                        {label: 'Report', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/report']},
                    ]
                },
            ];
        }else{
            this.model = [
                {
                    label: 'dashboard', icon: 'pi pi-fw pi-star',
                    items: [
                        {label: 'dashboard', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/dashboard']},
                    ]
                },
            ]
        }

 
    }
}
