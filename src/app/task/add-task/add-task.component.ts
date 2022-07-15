import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ToastServiceService } from 'src/app/shared/services/toast-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskFormData: any;
  editMode: boolean = false;
  taskList: any;
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private firebaseService: FirebaseService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: any) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      newTask:['',Validators.required],
      pregnancyDay:['',Validators.required]
    })
    this.taskFormData =this.taskData.data;
    this.getTaskList();
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
    this.taskForm.patchValue({
      newTask: this.taskFormData.newTask,
      pregnancyDay: this.taskFormData.pregnancyDay
    })
  }


  onSubmit(){
    let pregDayBoolean = this.taskList.some((item)=>{
        return item.pregnancyDay === this.taskForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      this.firebaseService.createDoc("tasks",this.taskForm.value).then(()=>{
        this.toast.success("Task Added Successfully");
        this.dialogRef.close();

      }),err=>{
        this.toast.error("Something Went Wrong");
        console.log(err)
      }
    }

  }

  getTaskList(){
    this.firebaseService.getDocs("tasks").subscribe((data: any)=>{
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
      return item.pregnancyDay === this.taskForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      this.firebaseService.updateDoc("tasks",this.taskFormData.id,this.taskForm.value).then(()=>{
        this.toast.success("Task Updated Successfully");
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
