import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClassService } from '../home/services/add-class.service';
import { Student } from '../models/student';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ensa-class',
  templateUrl: './ensa-class.component.html',
  styleUrls: ['./ensa-class.component.scss'],
})
export class EnsaClassComponent implements OnInit {
  students:any=[];
  present=true;
  date:Date;
  className:string="";
  constructor(
    public toastController: ToastController,
    private addClassS: AddClassService,
    private routeE:Router,
    private route:ActivatedRoute) {
      this.date=new Date();
     }

  ngOnInit() {
    let id=this.route.snapshot.params['id']==null?0:this.route.snapshot.params['id']
    this.className=this.routeE.getCurrentNavigation().extras.state.className;
    
    this.addClassS.getStudents(id).then(
      (res)=>{
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
           
            console.log(res.rows.item(i));
           let s1=new Student();
           s1.id=res.rows.item(i)['id'];
           s1.nom=res.rows.item(i)['nom'];
           s1.prenom=res.rows.item(i)['prenom'];
           
           let m=[]
           m.push(s1)
           m.push(true)
           this.students.push(m);

          }
          console.log(this.students)
          
        }else{
          console.log("non")
        }
      }
    )

  }
  goToStudent(id){

  }
  makePresent(index){
    console.log(index,this.students[index][1])
    this.students[index][1]=!this.students[index][1];
    console.log(index,this.students[index][1])
  }

  makeAbsent(index){
    console.log(index,this.students[index][1])
    this.students[index][1]=!this.students[index][1];
    console.log(index,this.students[index][1])
  }
  insertAbsents(){
    let m=[this.students[0][0]['id']];
    console.log( this.getListofabsent())
    if(this.getListofabsent().length!=0){
      this.addClassS.insertAbsents(this.getListofabsent(),this.date).then(
        (m)=>{
          console.log(m);
          this.presentToast("absents saved");
        }
      )
    }
    this.presentToast("saved without any absents")
    
  }
  getListofabsent():number[]{
    return this.students.filter(
      (e)=>{
        console.log(e[1])
        return e[1]
      }
    ).map(
      (element)=>{
        return element[0].id;
      }
    )
    
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();

  }
  profile(id,nom,prenom){
    console.log("profile id",id,nom,prenom)
    this.routeE.navigate([`absences/${id}`],{state:{name:`${nom} ${prenom}`}})
  }
}
