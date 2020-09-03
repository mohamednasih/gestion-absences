import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddClassService } from '../home/services/add-class.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent implements OnInit {

 
  constructor( 
    private dialogRef:MatDialogRef<EditClassComponent>,
    private addClassS: AddClassService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log("data",this.data);
    
  }
  onClose(){
    console.log("closssing")
    this.dialogRef.close();
  }
  update(){
    this.addClassS.updateTitreClass(this.data.id,this.data.titre).then(
      (suc)=>{this.onClose()}
    )

  }
  delete(){
    this.addClassS.deleteClass(this.data.id).then(
      (suc)=>{this.onClose()}
    )
  }

}
