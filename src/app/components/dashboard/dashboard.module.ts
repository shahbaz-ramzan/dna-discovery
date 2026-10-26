import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { TableComponent } from '../common/table/table.component';
import { NgChartsModule } from 'ng2-charts';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
    declarations: [DashboardComponent, TableComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PrimengModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgChartsModule,
        ProgressSpinnerModule,
        NgCircleProgressModule.forRoot({
            radius: 74,
            space: -8,
            outerStrokeWidth: 16,
            innerStrokeWidth: 16,
            outerStrokeColor: '#78C000',
            innerStrokeColor: '#C7E596',
            animationDuration: 300,
            titleFontSize: '20',
            titleFontWeight: 'bold',
            imageHeight: 100,
            imageWidth: 100
        })
    ],
    exports: []
})
export class DashboardModule {}
