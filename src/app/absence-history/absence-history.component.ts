import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AddClassService } from '../home/services/add-class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Absence } from '../models/absence';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditAbsenceComponent } from '../edit-absence/edit-absence.component';

@Component({
  selector: 'app-absence-history',
  templateUrl: './absence-history.component.html',
  styleUrls: ['./absence-history.component.scss'],
})
export class AbsenceHistoryComponent implements OnInit {
  name:any;
  absences=[];
  studentId;
  constructor(
      private toastController: ToastController,
      private addClassS: AddClassService,
      private activeRoute:ActivatedRoute,
      private dialog: MatDialog,
      private router:Router) {
    
   
   }

  ngOnInit() {
    let id=this.activeRoute.snapshot.params['id']==null?0:this.activeRoute.snapshot.params['id']
    this.studentId=id;
    this.name=this.router.getCurrentNavigation().extras.state['name'];
    console.log(id,this.name)
    this.getAbsents(id);
  }
  getAbsents(id){
    this.addClassS.getAbsents(id).then(
      (res)=>{
        if (res.rows.length > 0) {
          this.absences=[];
          for (var i = 0; i < res.rows.length; i++) {
            console.log(res.rows.length)
            let row=res.rows.item(i);
            let abs=new Absence();
            abs.id=row.id;
            abs.observation=row.observation;
            abs.date=new Date(row.date)
            this.absences.push(abs);

          }
        
          
        }else{
          console.log("non")
        }
      }
    )
  }
  editAbsense(id,index){
    console.log(id,index)
    console.log("get rows")
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="85%";
    dialogConfig.data=this.absences[index];
    this.dialog.open(EditAbsenceComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(
      ()=>{
        console.log("close;")
        console.log(this.studentId)
        this.absences=[];
        this.getAbsents(this.studentId);
      }
    )
    
  }

}
