import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/notfound/app.notfound.component';
import {AppErrorComponent} from './pages/error/app.error.component';
import {AppAccessdeniedComponent} from './pages/accessdenied/app.accessdenied.component';
import {AppLoginComponent} from './pages/login/app.login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PetComponent} from './pages/pet/pet.component';
import {AppReportComponent} from './pages/report/app.report.component'
@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppLoginComponent},
            {
                path: 'home', component: AppMainComponent,
                children: [
                    {path: 'dashboard', component: DashboardComponent},
                    {path: 'Pet', component: PetComponent},
                    {path:"report",component:AppReportComponent}
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
