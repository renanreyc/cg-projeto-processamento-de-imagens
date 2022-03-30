import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FiltrationComponent } from './pages/filtration/filtration.component';
import { OperationComponent } from './pages/operation/operation.component';
import { HistogramComponent } from './pages/histogram/histogram.component';
import { MorphologyComponent } from './pages/morphology/morphology.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
    imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule],
    declarations: [AppComponent, FiltrationComponent, OperationComponent, HistogramComponent, NavbarComponent, MorphologyComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
