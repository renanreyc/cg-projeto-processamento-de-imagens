import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiltrationComponent } from './pages/filtration/filtration.component';
import { HistogramComponent } from './pages/histogram/histogram.component';
import { OperationComponent } from './pages/operation/operation.component';
import { MorphologyComponent } from './pages/morphology/morphology.component';

const routes: Routes = [
    {
        path: 'filtration',
        component: FiltrationComponent,
    },
    {
        path: 'operation',
        component: OperationComponent,
    },
    {
        path: 'histogram',
        component: HistogramComponent,
    },
    {
        path: 'morphology',
        component: MorphologyComponent,
    },
    {
        path: '',
        redirectTo: 'filtration',
        pathMatch: 'full',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
