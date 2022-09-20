
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { ToastServiceService } from '../shared/services/toast-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../shared/services/firebase.service';
@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {
  videoForm: FormGroup;
  safeUrl: any;
  showThumbnail: boolean = false;
  showSubmit: boolean = true;
  motivationVideoList: any;
  yogaVideoList: any;
  specialVideoList: any;
  res: boolean;
  constructor(private fb: FormBuilder, private toast: ToastServiceService, private _sanitizer: DomSanitizer,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private dialogRef: MatDialogRef<UploadVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public videoData: any) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      duration: ['', Validators.required],
      pregnancyDay: ['', Validators.required]
    })
    this.getMotivationalVideos();
    this.getSpecialVideoList();
    this.yogasanaVideoList();
    if (this.videoData.data.id !== undefined) {
      this.setFormValue();
    }
    if (this.videoData.component === "MOTIVATIONAL" || this.videoData.component === "YOGASANA") {
      this.videoForm.removeControl("duration");
      // this.videoForm.addControl("pregnancyDay",new FormControl('', Validators.required));
    }
    if (this.videoData.component === "SPECIALVIDEO" ) {
      this.videoForm.removeControl("pregnancyDay");
      // this.videoForm.addControl("pregnancyDay",new FormControl('', Validators.required));
    }
  }

  getMotivationalVideos(){
    this.firebaseService.getDocs("MotivationalStories").subscribe((data: any)=>{
      this.motivationVideoList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
    },err=>{
      console.log(err)
    })
}

  getSpecialVideoList(){
    this.firebaseService.getDocs("specialVideos").subscribe((data: any)=>{
      this.specialVideoList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
    },err=>{
      console.log(err)
    })
    // firebase.firestore().collection("specialVideos").get().then((snapshotChanges)=>{
    //   snapshotChanges.forEach((doc)=>{
    //     const data= doc.data()
    //     const id =doc.id;
    //     this.specialVideoList.push({id,...data})
    //     // this.dataSource.data.push(item)
    //   })
    // }).catch((err)=>{
    //   console.log(err)
    // })
  }
  yogasanaVideoList(){
    this.firebaseService.getDocs("YogasanVideos").subscribe((data: any)=>{
      this.yogaVideoList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
    },err=>{
      console.log(err)
    })
  })
  }
  setFormValue() {
    this.showSubmit = false;
    if (this.videoData.component === "SPECIALVIDEO") {
      this.videoForm.removeControl("pregnancyDay");
      this.videoForm.patchValue({
        title: this.videoData.data.title,
        description: this.videoData.data.description,
        url: this.videoData.data.url,
        duration: this.videoData.data.duration
      })
    } else if (this.videoData.component === "MOTIVATIONAL") {
      console.log("Motivationa set form")
      this.videoForm.removeControl("duration");
      console.log(this.videoData.data)
      this.videoForm.patchValue({
        title: this.videoData.data.title,
        description: this.videoData.data.description,
        url: this.videoData.data.url,
        pregnancyDay: this.videoData.data.pregnancyDay
      })

    }
    else if (this.videoData.component === "YOGASANA") {
      console.log("Yoga set form")
      this.videoForm.removeControl("duration");
      console.log(this.videoData.data)
      this.videoForm.patchValue({
        title: this.videoData.data.title,
        description: this.videoData.data.description,
        url: this.videoData.data.url,
        pregnancyDay: this.videoData.data.pregnancyDay
      })

    }

  }

  sanitizeUrl() {
    let url = this.videoForm.get('url').value
    console.log(url)
    if (url && url.includes('watch')) {
      url = url.replace("watch?v=", "embed/");
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
      this.showThumbnail = true;
    }
    else if (url && !url.includes('watch')) {
      let stringIndex = url.lastIndexOf('/');
      let orginalFile = url.slice(stringIndex + 1, url.length);
      url = "https://www.youtube.com/embed/" + orginalFile;
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
      this.showThumbnail = true;
    }

  }

  onSubmit() {
    console.log(this.videoData.component)
    if (this.videoData.component === "SPECIALVIDEO") {
      this.postSpecialVideo();
    }
    if (this.videoData.component === "MOTIVATIONAL") {
      this.postMotivationalVideo();
    }
    if (this.videoData.component === "YOGASANA") {
      this.postYogaVideo();
    }

  }

  postSpecialVideo() {
    // let pregDayBoolean = this.specialVideoList.some((item)=>{
    //   return item.pregnancyDay === this.videoForm.value.pregnancyDay
    // })
    // if(pregDayBoolean){
    //   this.toast.error("Duplicate pregnancy day");
    // }else{
    firebase.firestore().collection("specialVideos").add(this.videoForm.value).
      then(() => {
        this.toast.success("Video Added Successfully");
        this.dialogRef.close();
      }).catch(() => {
        this.toast.error("Something went wrong")
      })
    // }
  }

  postMotivationalVideo() {
    let pregDayBoolean = this.motivationVideoList.some((item)=>{
      return item.pregnancyDay === this.videoForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      this.firebaseService.createDoc("MotivationalStories", this.videoForm.value).then(() => {
        this.toast.success("Video Added Successfully");
        this.dialogRef.close();
      }), err => {
        console.log(err)
      }
    }

  }

  postYogaVideo() {
    let pregDayBoolean = this.yogaVideoList.some((item)=>{
      return item.pregnancyDay === this.videoForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy month");
    }else{
      const docId= this.videoForm.value.pregnancyDay.toString()
      firebase.firestore().collection("YogasanVideos").doc(docId).set(this.videoForm.value).then(()=>{
        this.res =true;
        this.dialogRef.close();
      this.toast.success("Video added Successfully");
      }).catch(err=>{
        console.log(err);
        this.toast.error("Something went wrong")
      })
      // this.firebaseService.createDoc("YogasanVideos", this.videoForm.value).then(() => {
      //   this.toast.success("Video Added Successfully");
      //   this.dialogRef.close();
      // }), err => {
      //   console.log(err)
      // }
    }
  }

  updateSpecialVideo() {
    this.firebaseService.updateDoc("specialVideos", this.videoData.data.id, this.videoForm.value).then(() => {
      this.dialogRef.close();
      this.toast.success("Video Updated Successfully");

    }).catch(err => {
      console.log(err)
      this.toast.error(err)
    })
    // this.firestore.collection("specialVideos").doc(this.videoData.id).update(this.videoForm.value).then(() => {
    //   this.dialogRef.close();
    // }).catch(err => {
    //   console.log(err)
    //   this.toast.error(err)
    // })
  }

  updateMotivationalVideo() {
    this.firebaseService.updateDoc("MotivationalStories", this.videoData.data.id, this.videoForm.value).then(() => {
      this.dialogRef.close();
      this.toast.success("Video Updated Successfully");

    }).catch(err => {
      console.log(err)
      this.toast.error(err)
    })

  }

  updateYogaVideo() {
    this.firebaseService.updateDoc("YogasanVideos", this.videoData.data.id, this.videoForm.value).then(() => {
      this.dialogRef.close();
      this.toast.success("Video Updated Successfully");
    }).catch(err => {
      console.log(err)
      this.toast.error(err)
    })
  }

  onUpdate() {
    if (this.videoData.component === "SPECIALVIDEO") {
      this.updateSpecialVideo();
    }
    if (this.videoData.component === "MOTIVATIONAL") {
      this.updateMotivationalVideo();
    }
    if (this.videoData.component === "YOGASANA") {
      this.updateYogaVideo();
    }

  }

  onDelete() {
    this.firestore.collection("specialVideos").doc(this.videoData.id).delete();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
