import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { AddClassService } from '../home/services/add-class.service';
@Component({
  selector: 'app-hey',
  templateUrl: './hey.component.html',
  styleUrls: ['./hey.component.scss'],
})
export class HeyComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<HeyComponent>,
    private addClassSevice:AddClassService) { }
  className:string;
  ngOnInit() {}
  onClose(){
    console.log("closssing")
    this.dialogRef.close();
  }
  async add(){
    this.dialogRef.close();
    console.log(this.className);
    await this.addClassSevice.saveClass(this.className);
    this.addClassSevice.addClass();
  }
}
