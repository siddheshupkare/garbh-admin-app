import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import firebase from 'firebase'
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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.specialVideoList();
  }


  specialVideoList(){
    firebase.firestore().collection("specialVideos").get().then((snapshotChanges)=>{
      snapshotChanges.forEach((doc)=>{
        const data= doc.data()
        const id =doc.id;
        this.videoList.push({id,...data})
        // this.dataSource.data.push(item)
      })
      this.dataSource = new MatTableDataSource([...this.videoList]);
      console.log(this.dataSource.data)
    }).catch((err)=>{
      console.log(err)
    })
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

}
