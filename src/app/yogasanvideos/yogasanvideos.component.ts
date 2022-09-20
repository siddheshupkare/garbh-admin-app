import { Component, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideoComponent } from '../upload-video/upload-video.component';
import { FirebaseService } from '../shared/services/firebase.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-yogasanvideos',
  templateUrl: './yogasanvideos.component.html',
  styleUrls: ['./yogasanvideos.component.css']
})
export class YogasanvideosComponent implements OnInit {
  displayedColumns: string[] = ['day', 'title', 'description', 'url', 'edit', 'delete'];
  videoList: any[]=[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog,private firebaseService: FirebaseService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.yogasanaVideoList();

  }


  yogasanaVideoList(){
    this.firebaseService.getDocs("YogasanVideos").subscribe((data: any)=>{
      this.videoList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      this.dataSource= new MatTableDataSource(this.videoList)
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      },100)

    },err=>{
      console.log(err)
    })
  }

  addYogasanaVideo(videoData?: any){
    this.dialog.open(UploadVideoComponent,{
      height: "auto",
      width: "500px",
      data: {"data":videoData ? videoData : "",
      "component": "YOGASANA"
             },
    })
  }

   onEdit(id: any){
    firebase.firestore().collection('YogasanVideos').doc(id).get().then(res=>{
     console.log(res.data())
     this.addYogasanaVideo({id,...res.data()})
    }).catch(err=>{
      console.log(err)
    });
   }

   onDelete(id: any){
    this.firebaseService.deleteDoc("YogasanVideos",id).then(()=>{
      this.toastr.success("Deleted Successfully");
    }).catch(err=>{
      console.log(err);
      this.toastr.error("Something went wrong");
    })
  }

}
