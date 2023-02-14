import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../shared/services/firebase.service';
import { AddShlokComponent } from './add-shlok/add-shlok.component';

@Component({
  selector: 'app-shlok',
  templateUrl: './shlok.component.html',
  styleUrls: ['./shlok.component.css']
})
export class ShlokComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['day','shlok','edit','delete'];
  taskList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private toastr: ToastrService,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getTaskList();
  }


  getTaskList(){
    this.firebaseService.getDocs("shlok").subscribe((data: any)=>{
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
  this.firebaseService.getDocById("shlok",id).subscribe((res: any)=>{
    console.log(res.data())
    this.addTask({id,...res.data()})
  })
}

onDelete(id: any){
  this.firebaseService.deleteDoc("shlok",id).then(()=>{
    this.toastr.success("Deleted Successfully");
  }).catch(err=>{
    console.log(err);
    this.toastr.error("Something went wrong");
  })
}

  addTask(shlokData?: any){
    this.dialog.open(AddShlokComponent,{
      height: "auto",
      width: "500px",
      data: {"data":shlokData ? shlokData : ""},
    })
  }
}
