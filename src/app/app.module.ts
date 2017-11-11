import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProjectileComponent } from './components/projectile/projectile.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        ProjectileComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }