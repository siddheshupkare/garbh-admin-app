import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
// import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase'
import { ToastServiceService } from 'src/app/shared/services/toast-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
@Component({
  selector: 'app-book-code-upload',
  templateUrl: './book-code-upload.component.html',
  styleUrls: ['./book-code-upload.component.css']
})
export class BookCodeUploadComponent implements OnInit {
  value: any;
  bookCodes:any;
  types=["Book Code","Partner Code"];
  showLoader: boolean= false;
  showFileIcon: boolean =false;
  fileName: any;
  res: any;
  codeForm: FormGroup;
  showInputField: boolean =false;


  constructor(
    public dialogRef: MatDialogRef<BookCodeUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private toast: ToastServiceService,
    private fb: FormBuilder,
    private firebase: FirebaseService
    // public fireservices: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.codeForm = this.fb.group({
        code: ['',Validators.required],
        codeType: ['',Validators.required],
        partnerName: ['',Validators.required]
    })
  }
  uploadBookscode(event: any){
    this.showFileIcon=true
    console.log("helo",event.target.files);
    const selectedFile= event.target.files[0];
    this.fileName= selectedFile.name
    const fileReader= new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload= (event: any) => {
      console.log("onload",event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData,{type: "binary"});
      // workbook.SheetNames.forEach(sheet =>{
      //   const data= XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      //   console.log("hey",data)
      //   this.bookCodes = data

      // })
      let first_sheet_name=workbook.SheetNames[0]
      const data= XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
      console.log("hey",data)
      this.bookCodes = data
      console.log(workbook)
    }
  }

  inputCheck(event: any){
    console.log(event.value)
    if(event.value == "Partner Code"){
      this.showInputField= true;
    }
  }

  onSubmit(){
    this.bookCodes.forEach((item,index)=>{
      console.log(item,index)
    firebase.firestore().collection("codes").doc(item.Code).set(item).then(()=>{
      this.res =true;
      this.dialogRef.close();
    this.toast.success("Codes added Successfully");
    }).catch(err=>{
      console.log(err);
      this.toast.error("Something went wrong")
    })
  })

  }


  onSingleCodeSubmit(){
    firebase.firestore().collection("codes").doc(this.codeForm.value.code).set(this.codeForm.value).then(()=>{
      this.res =true;
      this.dialogRef.close();
      this.toast.success("Code added Successfully");
    }).catch(err=>{
      console.log(err);
      this.toast.error("Something went wrong")
    })
  }

  onDragDropUpload(data: any){
    console.log(data)

  }


}
