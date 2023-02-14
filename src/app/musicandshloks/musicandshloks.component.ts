import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import firebase from 'firebase'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '../shared/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { AddMusicShlokComponent } from './add-music-shlok/add-music-shlok.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-musicandshloks',
  templateUrl: './musicandshloks.component.html',
  styleUrls: ['./musicandshloks.component.css']
})
export class MusicandshloksComponent implements OnInit {
  musicList: any;
  dataSource: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['day', 'title','subtitle', 'type', 'edit', 'delete'];
  constructor(private firebaseService: FirebaseService,private dialog: MatDialog,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getMusicShlok();

  }

  getMusicShlok(){
    this.firebaseService.getDocs("AudioPlaying").subscribe((data: any)=>{
      this.musicList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      this.dataSource= new MatTableDataSource(this.musicList)
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      },100)

      console.log(this.musicList);
    },err=>{
      console.log(err)
    })
}


addMusicShlok(musicData?: any){
  this.dialog.open(AddMusicShlokComponent,{
    height: "auto",
    width: "500px",
    data: musicData ? musicData : "",

  })
}

onEdit(id: any){
  this.firebaseService.getDocById("AudioPlaying",id).subscribe((res: any)=>{
    this.addMusicShlok({id,...res.data()});
  })

}

onDelete(id: any){
  this.firebaseService.deleteDoc("AudioPlaying",id).then(()=>{
    this.toastr.success("Deleted Successfully");
  }).catch(err=>{
    console.log(err);
    this.toastr.error("Something went wrong");
  })
}
}
