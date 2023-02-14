import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../shared/services/firebase.service';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['day', 'task', 'edit','delete'];
  taskList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private toastr: ToastrService,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getTaskList();
  }


  getTaskList(){
    this.firebaseService.getDocs("tasks").subscribe((data: any)=>{
      this.taskList= data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      console.log(this.taskList);
      this.dataSource = new MatTableDataSource(this.taskList);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      },100)

    },err=>{
      console.log(err)
    })
}

onEdit(id: any){
  console.log(id)
  this.firebaseService.getDocById("tasks",id).subscribe((res: any)=>{
    console.log(res.data())
    this.addTask({id,...res.data()})
  })
}

onDelete(id: any){
  this.firebaseService.deleteDoc("tasks",id).then(()=>{
    this.toastr.success("Deleted Successfully");
  }).catch(err=>{
    console.log(err);
    this.toastr.error("Something went wrong");
  })
}

  addTask(taskData?: any){
    this.dialog.open(AddTaskComponent,{
      height: "auto",
      width: "500px",
      data: {"data":taskData ? taskData : ""},
    })
  }

}
