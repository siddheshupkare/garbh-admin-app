import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import firebase from 'firebase'
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../shared/services/firebase.service';
import { UploadVideoComponent } from '../upload-video/upload-video.component';

@Component({
  selector: 'app-special-video',
  templateUrl: './special-video.component.html',
  styleUrls: ['./special-video.component.css']
})
export class SpecialVideoComponent implements OnInit {
  displayedColumns: string[] = ['day', 'title', 'description', 'url', 'edit', 'delete'];
  videoList: any[]=[];
  dataSource: any;

  constructor(private dialog: MatDialog,private firebaseService: FirebaseService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.specialVideoList();
  }


  specialVideoList(){
    this.firebaseService.getDocs("specialVideos").subscribe((data: any)=>{
      this.videoList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      this.dataSource= new MatTableDataSource(this.videoList)
      console.log(this.videoList);
    },err=>{
      console.log(err)
    })
    // firebase.firestore().collection("specialVideos").get().then((snapshotChanges)=>{
    //   snapshotChanges.forEach((doc)=>{
    //     const data= doc.data()
    //     const id =doc.id;
    //     this.videoList.push({id,...data})
    //     // this.dataSource.data.push(item)
    //   })
    //   this.dataSource = new MatTableDataSource([...this.videoList]);
    //   console.log(this.dataSource.data)
    // }).catch((err)=>{
    //   console.log(err)
    // })
  }

  addSpecialVideo(videoData?: any){
    this.dialog.open(UploadVideoComponent,{
      height: "auto",
      width: "500px",
      data: {"data":videoData ? videoData : "",
      "component": "SPECIALVIDEO"
             },
    })
  }

   onEdit(id: any){
    firebase.firestore().collection('specialVideos').doc(id).get().then(res=>{
     console.log(res.data())
     this.addSpecialVideo({id,...res.data()})
    }).catch(err=>{
      console.log(err)
    });
   }

   onDelete(id: any){
    this.firebaseService.deleteDoc("specialVideos",id).then(()=>{
      this.toastr.success("Deleted Successfully");
    }).catch(err=>{
      console.log(err);
      this.toastr.error("Something went wrong");
    })
  }

}
