import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {MatIconModule} from '@angular/material/icon'
import {FilePath} from  '@ionic-native/file-path/ngx';
import { SQLite} from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { AddClassService } from './services/add-class.service';
import {MatDialogModule} from '@angular/material/dialog';
import { HeyComponent } from '../hey/hey.component';
import { EnsaClassComponent } from '../ensa-class/ensa-class.component';
import { AbsenceHistoryComponent } from '../absence-history/absence-history.component';
import { EditAbsenceComponent } from '../edit-absence/edit-absence.component';
import { EditClassComponent } from '../edit-class/edit-class.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  declarations: [HomePage,
    HeyComponent,
    EnsaClassComponent,
    EditAbsenceComponent,
    EditClassComponent,
    ],
  providers:[
    FilePath,
    Chooser,
    SQLite,
    File
 ],
  entryComponents:[HeyComponent,EditAbsenceComponent,EditClassComponent]
})
export class HomePageModule {
  
}
