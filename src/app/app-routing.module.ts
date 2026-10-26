import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BdnaReportsComponent } from './components/bdna-reports/bdna-reports.component';
import { FdnaReportsComponent } from './components/fdna-reports/fdna-reports.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { EmailOptoutComponent } from './components/email-optout/email-optout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./components/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'investor',
        component: WellcomeComponent,
        children: [
            {
                path: ':accName/:accId/:regId',
                component: WellcomeComponent
            }
        ]
    },
    {
        path: 'talent',
        component: WellcomeComponent,
        children: [
            {
                path: ':accName/:accId/:regId',
                component: WellcomeComponent
            }
        ]
    },
    { path: 'thankyou/:accId/:personId/:creditId', component: EmailOptoutComponent },

    { path: '404', component: NotfoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
