import { Component, OnInit } from '@angular/core';
import { aClass } from '../models/aClass';
import { Student } from '../models/student';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

import * as XLSX from 'xlsx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { AddClassService } from './services/add-class.service';
import { MatDialog,MatDialogConfig} from "@angular/material/dialog";
import { HeyComponent } from '../hey/hey.component';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage   {
  //constructor(private data: DataService) {}

  f: {
    localUrl: string
  }

  date=Date.now();
  databaseObj: any;
  students: Student[];
  classes: any[]=[];
  constructor(
   private addClassS: AddClassService,
    private dialog: MatDialog,
    private router: Router
  ) {
   addClassS.getMessage().subscribe(
    (m)=>{

      console.log(m);
      this.getClasses();
    }

   )
  }
 
  addClass() {
    this.getClassName();
   
  }
  getClassName() {
    console.log("get rows")
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(HeyComponent,dialogConfig)
    //this.addClassS.getRows();
  }
  getRows(){
    console.log("get Rows")
    this.addClassS.getStudents(1).then((res) => {
      console.log("i am in")
      this.students = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
         
          this.students.push(res.rows.item(i));
        }
        console.log(this.students)
        
      }else{
        console.log("non")
      }
    })
    .catch(e => {
      console.log("error " + JSON.stringify(e))
    });
  }
  getClasses(){
    this.addClassS.getClasses().then((res) => {
      console.log("i am in")
      this.classes = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
         
          this.classes.push(res.rows.item(i));
        }
        console.log(this.classes)
        
      }else{
        console.log("non")
      }
    })
    .catch(e => {
      console.log("error " + JSON.stringify(e))
    });
  }
  goToClass(id,className){
   
   this.changeRoute(id,className);
  }
  changeRoute (id,className) {
    this.router.navigate(['/class/'+id],{ state: { className: className } });
  }

}
