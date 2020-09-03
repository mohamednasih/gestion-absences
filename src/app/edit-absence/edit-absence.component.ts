import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Absence } from '../models/absence';
import { AddClassService } from '../home/services/add-class.service';

@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.scss'],
})
export class EditAbsenceComponent implements OnInit {
 
  constructor( 
    private dialogRef:MatDialogRef<EditAbsenceComponent>,
    private addClassS: AddClassService,
    @Inject(MAT_DIALOG_DATA) public data: Absence) { }

  ngOnInit() {
    console.log("data",this.data);
    
  }
  onClose(){
    console.log("closssing")
    this.dialogRef.close();
  }
  update(){
    this.addClassS.updateObservationAbsence(this.data.id,this.data.observation).then(
      (suc)=>{this.onClose()}
    )

  }
  delete(){
    this.addClassS.delete(this.data.id).then(
      (suc)=>{this.onClose()}
    )
  }

}
