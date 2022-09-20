import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import firebase from 'firebase'
import {MatSnackBar} from '@angular/material/snack-bar';
import { FirebaseService } from '../shared/services/firebase.service';
import { UploadVideoComponent } from '../upload-video/upload-video.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-motivationalquotes',
  templateUrl: './motivationalquotes.component.html',
  styleUrls: ['./motivationalquotes.component.css']
})
export class MotivationalquotesComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['day', 'title', 'description', 'url', 'edit', 'delete'];
  private _mobileQueryListener: () => void;
  dataSource: any;
  videoList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private firebaseService: FirebaseService,private dialog: MatDialog,
    private toastr: ToastrService){
  }


  ngOnInit(): void {
    this.getMotivationalVideos();
  }

  ngAfterViewInit() {

  }

   getMotivationalVideos(){
      this.firebaseService.getDocs("MotivationalStories").subscribe((data: any)=>{
        this.videoList=data.map(data=>{
          return({...data.payload.doc.data(),
          id:data.payload.doc.id})
        })
        this.dataSource= new MatTableDataSource(this.videoList)
        setTimeout(()=>{
          this.dataSource.paginator = this.paginator;
        },100)

        console.log(this.videoList);
      },err=>{
        console.log(err)
      })
  }


  addMotivationalVideo(videoData?: any){
    this.dialog.open(UploadVideoComponent,{
      height: "auto",
      width: "500px",
      data: {"data":videoData ? videoData : "",
              "component": "MOTIVATIONAL"
            },


    })
  }

  onEdit(id: any){
    this.firebaseService.getDocById("MotivationalStories",id).subscribe((res: any)=>{
      this.addMotivationalVideo({id,...res.data()});
    })

  }

  onDelete(id: any){
    this.firebaseService.deleteDoc("MotivationalStories",id).then(()=>{
      this.toastr.success("Deleted Successfully");
    }).catch(err=>{
      console.log(err);
      this.toastr.error("Something went wrong");
    })
  }

  ngOnDestroy(): void {

  }

}
