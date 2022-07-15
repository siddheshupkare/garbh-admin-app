import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ToastServiceService } from 'src/app/shared/services/toast-service.service';

@Component({
  selector: 'app-add-shlok',
  templateUrl: './add-shlok.component.html',
  styleUrls: ['./add-shlok.component.css']
})
export class AddShlokComponent implements OnInit {
  shlokForm: FormGroup;
  taskFormData: any;
  editMode: boolean = false;
  taskList: any;
  constructor(private fb: FormBuilder,
    private toast: ToastServiceService,
    private firebaseService: FirebaseService,
    private dialogRef: MatDialogRef<AddShlokComponent>,
    @Inject(MAT_DIALOG_DATA) public shlokData: any) { }

  ngOnInit(): void {
    this.shlokForm = this.fb.group({
      shlok:[''],
      pregnancyDay:['',Validators.required]
    })
    this.taskFormData =this.shlokData.data;
    this.getShlokList();
    console.log(this.taskFormData.id)

    if(this.taskFormData.id !== undefined){
      console.log("Edit mode")
      this.setFormValue();
     }else{
      this.editMode = false;
     }
  }

  setFormValue(){
    this.editMode= true;
    this.shlokForm.patchValue({
      shlok: this.taskFormData.shlok,
      pregnancyDay: this.taskFormData.pregnancyDay
    })
  }


  onSubmit(){
    let pregDayBoolean = this.taskList.some((item)=>{
        return item.pregnancyDay === this.shlokForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      this.firebaseService.createDoc("shlok",this.shlokForm.value).then(()=>{
        this.toast.success("Shlok Added Successfully");
        this.dialogRef.close();

      }),err=>{
        this.toast.error("Something Went Wrong");
        console.log(err)
      }
    }

  }

  getShlokList(){
    this.firebaseService.getDocs("shlok").subscribe((data: any)=>{
      this.taskList= data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      console.log(this.taskList);
    },err=>{
      console.log(err)
    })
}

  onUpdate(){
    let pregDayBoolean = this.taskList.some((item)=>{
      return item.pregnancyDay === this.shlokForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      this.firebaseService.updateDoc("shlok",this.taskFormData.id,this.shlokForm.value).then(()=>{
        this.toast.success("Shlok Updated Successfully");
        this.dialogRef.close();
      }),err=>{
        this.toast.error("Something went wrong ");
        console.log(err);
      }
    }
  }

  onCancel(){
    this.dialogRef.close();
  }


}
