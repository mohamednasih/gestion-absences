import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeyComponent } from './hey/hey.component';
import { EnsaClassComponent } from './ensa-class/ensa-class.component';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AddClassService } from './home/services/add-class.service';
import { HomePageModule } from './home/home.module';
import { AbsenceHistoryComponent } from './absence-history/absence-history.component';

@NgModule({
  declarations: [AppComponent,AbsenceHistoryComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule, 
     BrowserAnimationsModule,
     HomePageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
