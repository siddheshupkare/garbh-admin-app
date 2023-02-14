import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add-music-shlok',
  templateUrl: './add-music-shlok.component.html',
  styleUrls: ['./add-music-shlok.component.css']
})
export class AddMusicShlokComponent implements OnInit {
  typeOptions=["Music","Shlok"]
  musicForm: FormGroup;
  musicFormData: any;
  editMode: boolean = false;
  imgSrc: any;
  imageFile: any;
  showCover: boolean = false;
  fileName: any;
  file:any;
  showImgName: boolean;
  coverImageUrl: any;
  mediaUrl:any;
  mediaSrc: any;
  formData: any
  musicList: any;
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private firebaseService: FirebaseService,
    private afStorage: AngularFireStorage,
    private dialogRef: MatDialogRef<AddMusicShlokComponent>,

    @Inject(MAT_DIALOG_DATA) public musicData: any) { }

  ngOnInit(): void {
    this.getMusicShlok();
    this.musicForm = this.fb.group({
      title: ['',Validators.required],
      subtitle: ['',Validators.required],
      pregnancyDay: ['',Validators.required],
      type:['',Validators.required]
    })
    if(this.musicData.id !== undefined){
      this.setMusicFormValue();
      this.musicForm.controls.pregnancyDay.disable();
      console.log(this.musicData)
    }
  }

  setMusicFormValue(){
    this.editMode =true;
    this.musicForm.patchValue({
      title: this.musicData.title,
      subtitle: this.musicData.subtitle,
      pregnancyDay: this.musicData.pregnancyDay,
      type: this.musicData.type
    })
    this.showCover =true;
    this.imgSrc = this.musicData.imageUrl;
    this.mediaSrc = this.musicData.songUrl;



  }

  onSubmit(){
    let pregDayBoolean = this.musicList.some((item : any)=>{
      return item.pregnancyDay === this.musicForm.value.pregnancyDay
    })

    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      let data = {
        imageUrl:  this.coverImageUrl ? this.coverImageUrl : '',
        songUrl:  this.mediaUrl ? this.mediaUrl : '',
        ...this.musicForm.value

      }
      console.log(data)
      this.firebaseService.createDoc("AudioPlaying",data).then(()=>{
        this.toast.success("Added Successfully");
        this.dialogRef.close();

      }),err=>{
        this.toast.error("Something Went Wrong");
        console.log(err)
      }

    }
  }

  getMusicShlok(){
    this.firebaseService.getDocs("AudioPlaying").subscribe((data: any)=>{
      this.musicList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      console.log(this.musicList)
    },err=>{
      console.log(err)
    })
}

  onUpdate(){
    let pregDayBoolean =false;
    // let pregDayBoolean = this.musicList.some((item : any)=>{
    //   return item.pregnancyDay === this.musicForm.value.pregnancyDay
    // })

    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }
    else{
      this.formData = {
        imageUrl:  this.coverImageUrl ? this.coverImageUrl : this.musicData.imageUrl,
        songUrl:  this.mediaUrl ? this.mediaUrl : this.musicData.songUrl,
        ...this.musicForm.value
          }
        this.firebaseService.updateDoc("AudioPlaying",this.musicData.id,this.formData).then(()=>{
          this.toast.success("Updated Successfully");
          this.dialogRef.close();
        }),err=>{
          this.toast.error("Something went wrong ");
          console.log(err);
        }
    }

  }

  addCoverImage(event: any){
    this.imageFile = event.target.files[0];
    const imageFileName = event.target.files[0].name;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.showCover = true;
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSrc = reader.result as string;
      };
      const filePath="images/music_cover/"
      const fileRef= this.afStorage.ref(filePath+imageFileName)
      const fileData = fileRef.put(this.imageFile)
      fileData.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url)=>{
               //Save Upload URL in Cloudfirestore
              console.log("Image url",url)
              this.coverImageUrl = url;
        })
      })).subscribe();
    }

  }

  selectMedia(event: any){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name
    console.log(this.fileName);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      this.showImgName = true;
      // reader.onload = () => {
      //   this.imageSrc = reader.result as string;
      // };
      const filePath="/MusicAndShloks/"
      const fileRef= this.afStorage.ref(filePath+this.fileName)
      const fileData = fileRef.put(this.file)
      fileData.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url)=>{
               //Save Upload URL in Cloudfirestore
              console.log("Media url",url)
              this.mediaUrl = url;
        })
      })).subscribe();
    }
  }

  onRemoveCover(){
    this.showCover = false;
    this.imgSrc = "";
  }

  onCancel(){
    this.dialogRef.close();
  }

}
