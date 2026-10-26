import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BdnaReportsComponent } from '../bdna-reports/bdna-reports.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FdnaReportsComponent } from '../fdna-reports/fdna-reports.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'instructions', component: InstructionsComponent },
            { path: 'questionnaire', component: QuestionnaireComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'bdna-report', component: BdnaReportsComponent },
            { path: 'fdna-report', component: FdnaReportsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
