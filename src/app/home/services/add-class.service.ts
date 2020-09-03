import { Injectable } from '@angular/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import * as XLSX from 'xlsx';
import { Student } from 'src/app/models/student';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddClassService {

  row_data: Student[];
  databaseObj: SQLiteObject;
  students: Student[];
  idClass: number=null;
  private subject = new Subject<any>();

  sendMessage(message: string) {
      this.subject.next({ text: message });
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
}
  constructor(
    private chooser: Chooser,
    private file: File,
    private sqlite: SQLite,
    private filePath: FilePath
  ) {

    this.sqlite.create({
      name: 'les_ab_db3',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.sendMessage("databaseOpened")
          db.executeSql("PRAGMA foreign_keys = 1").then(
            (r)=>console.log(r)
          ).catch(e=>console.log(e))

        db.executeSql('create table if not exists class (id integer PRIMARY KEY AUTOINCREMENT,titre VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        db.executeSql('create table  if not exists student (id varchar(32) PRIMARY KEY ,prenom VARCHAR(32),nom VARCHAR(32),classId intger,FOREIGN KEY(classId) REFERENCES class(id) ON DELETE CASCADE)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        db.executeSql('create table   if not exists absence (id integer PRIMARY KEY AUTOINCREMENT,date integer ,observation VARCHAR(32),studentId varchar(32),FOREIGN KEY(studentId) REFERENCES student(id) ON DELETE CASCADE)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));



      })
      .catch(e => console.log(e));
    
  }

  updateTitreClass(idClass,titre){
    return this.databaseObj.executeSql(`
    update class  set titre='${titre}' where id=${idClass}
    `
    , [])
  }

  deleteClass(idClass){
    return this.databaseObj.executeSql(`
    delete from class  where id=${idClass}
    `
    , [])
  }

  delete(idAbsence){
    return this.databaseObj.executeSql(`
    delete from absence  where id=${idAbsence}
    `
    , [])
  }
  updateObservationAbsence(idAbsence,observation){
    return this.databaseObj.executeSql(`
    update absence set observation='${observation}' where id=${idAbsence}
    `
    , [])
  }
  getAbsents(idStudent){
    return this.databaseObj.executeSql(`
    SELECT * FROM absence where studentId='${idStudent}'
    `
    , [])
  }


  getStudents(id) :Promise<any>{
    console.log("getttting rows")
    console.log(this.databaseObj)
    return this.databaseObj.executeSql(`
    SELECT * FROM student where classId='${id}'
    `
    , [])
      
  }
  insertAbsents(students:number[],date){
    console.log(students,date)
    let inser="";
    if(students.length>0){
      for(let i=0;i<students.length;i++){
        if(i!=0){
          inser=inser+`,(${students[i]},${Date.parse(date)})`
        }else{
          inser=`values(${students[i]},${Date.parse(date)})`
        }
      }

    }
    console.log(inser);
    return this.databaseObj.executeSql(`
      insert into absence(studentId,date)  ${inser}
    `
    , [])
  }
  getClasses() :Promise<any>{
    console.log("getttting rows")
    console.log(this.databaseObj);
    
    return this.databaseObj.executeSql(`
      SELECT * FROM class 
      `
      , [])
      
  }
  
  ceateClass() {


    this.databaseObj.executeSql(`
        INSERT INTO class(titre) VALUES ("ENSA INFO")
      `, [])
      .then((m) => {
        console.log(m.insertId);

      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  addStudent(student,idClass:number){
    let m:number=9;
  
  this.databaseObj.executeSql(`
        INSERT INTO student(id,prenom,nom,classId)  VALUES ('${student.id}','${student.prenom}','${student.nom}',${idClass})
      `, [])
    .then((m) => {
      console.log(m);
      

    })
    .catch(e => {
      console.log(e)
    });
}
parseExcel(fileEntry) {
  /* wire up file reader */
  fileEntry.file(function (file: Blob) {
    var reader = this.getFileReader();

    reader.onloadend = function () {
      this.arrayBuffer = reader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      if(this.idClass!=null){
        XLSX.utils.sheet_to_json(worksheet, { raw: true }).forEach((e: Student) => {
          this.addStudent(e,this.idClass);
          console.log(e)
        }
        
        );
       
      }else{
        alert("add class first")
      }
      this.sendMessage("databaseOpened")
    }.bind(this)



    reader.readAsArrayBuffer(file);
    console.log(reader.readyState)

  }.bind(this));

  /* create workbook */
  // Data will be logged in array format containing objects

}
saveClass(titre:string){
  
  this.databaseObj.executeSql(`insert into class (titre) values('${titre}')`,[]).then(
    (rowInseted)=>{
      this.idClass=rowInseted.insertId
      console.log(rowInseted)
     
    }
  ).catch(e=>console.log(e))
}
addClass() {
  this.chooser.getFile("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain")
    .then((file) => {
      console.log(file.mediaType);
      this.filePath.resolveNativePath(file.uri).then((resolvenativeapp) => {
        console.log(resolvenativeapp);
        let n = resolvenativeapp.split("/")
        let fileName = n[n.length - 1]
        console.log(fileName);
        let directoryPath = resolvenativeapp.slice(0, resolvenativeapp.length - fileName.length - 1);
        this.file.resolveDirectoryUrl(directoryPath).then((u) => {
          this.file.getFile(u, fileName, { create: false })
            .then((fileEntry: FileEntry) => {

              if (fileName.endsWith(".xls") || fileName.endsWith("xlsx")) {
                this.parseExcel(fileEntry);
              } else if (fileName.endsWith(".txt")) {
                console.log("add txt file")

              } else {
                alert("format no supported")
              }

            })
            .catch(m => console.log(m))

        }

        ).catch(e => console.log(e))
      }).catch((e) => console.log(e))
    }).catch(e => console.log(e))
}
readFile(fileEntry) {

  fileEntry.file(function (file: Blob) {
    var reader = this.getFileReader();

    reader.onloadend = function () {
      console.log(this.result.split("\n").length)
      console.log("Successful file read: " + this.result);
      alert(this.result)
    };


    reader.readAsText(file);
    console.log(reader.readyState)

  }.bind(this));
}
getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}
}
