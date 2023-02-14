import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../shared/services/firebase.service';
import { AddSamvadComponent } from './add-samvad/add-samvad.component';

@Component({
  selector: 'app-garbh-samvad',
  templateUrl: './garbh-samvad.component.html',
  styleUrls: ['./garbh-samvad.component.css']
})
export class GarbhSamvadComponent implements OnInit {
  musicList: any;
  dataSource: any;
  displayedColumns: string[] = ['day', 'title','subtitle',  'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private firebaseService: FirebaseService,private dialog: MatDialog,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getMusicShlok();

  }

  getMusicShlok(){
    this.firebaseService.getDocs("garbhSamvad").subscribe((data: any)=>{
      this.musicList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      this.dataSource= new MatTableDataSource(this.musicList)
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      },100)
    },err=>{
      console.log(err)
    })
}


addMusicShlok(musicData?: any){
  this.dialog.open(AddSamvadComponent,{
    height: "auto",
    width: "500px",
    data: musicData ? musicData : "",

  })
}

onEdit(id: any){
  this.firebaseService.getDocById("garbhSamvad",id).subscribe((res: any)=>{
    this.addMusicShlok({id,...res.data()});
  })

}

onDelete(id: any){
  this.firebaseService.deleteDoc("garbhSamvad",id).then(()=>{
    this.toastr.success("Deleted Successfully");
  }).catch(err=>{
    console.log(err);
    this.toastr.error("Something went wrong");
  })
}

}
