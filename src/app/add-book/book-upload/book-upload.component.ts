import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css']
})
export class BookUploadComponent implements OnInit {
  mediaSrc: any;
  bookForm: FormGroup
  editMode: boolean;
  bookUrl: any;
  file: any;
  fileName: any;
  mediaUrl: any;
  bookSelected: boolean;
  bookList: any;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookUploadComponent>,
     private afStorage: AngularFireStorage,
     private firebaseService: FirebaseService,
     private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public bookData: any) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]

    })
    if(this.bookData.id !== undefined){
      this.setBookFormValue();

    }
    this.getBookList
  }

  getBookList(){
    this.firebaseService.getDocs("Book").subscribe((data: any)=>{
      this.bookList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
    },err=>{
      console.log(err)
    })
}

  setBookFormValue(){
    this.editMode =true;
    this.bookForm.patchValue({
      title: this.bookData.title,
      description: this.bookData.description,

    })
    this.bookUrl = this.bookData.url;

  }

  selectMedia(event: any){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name
    console.log(this.fileName);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.imageSrc = reader.result as string;
      // };
      const filePath="/Books/"
      const fileRef= this.afStorage.ref(filePath+this.fileName)
      const fileData = fileRef.put(this.file)
      fileData.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url)=>{
               //Save Upload URL in Cloudfirestore
              console.log("Media url",url)
              this.mediaUrl = url;
              this.bookSelected= true;
        })
      })).subscribe();
    }
  }
  onSubmit(){
    // let pregDayBoolean = this.bookList.some((item)=>{
    //   return item.pregnancyDay === this.bookForm.value.pregnancyDay
    // })
    // if(pregDayBoolean){
    //   this.toast.error("Duplicate pregnancy day");
    // }else{
      let data = {
        url:  this.mediaUrl,
        ...this.bookForm.value
      }
      console.log(data)
      this.firebaseService.createDoc("Book",data).then(()=>{
        this.toast.success("Added Successfully");
        this.dialogRef.close();

      }),err=>{
        this.toast.error("Something Went Wrong");
        console.log(err)
      }
  }

  onUpdate(){
    let pregDayBoolean = this.bookList.some((item)=>{
      return item.pregnancyDay === this.bookForm.value.pregnancyDay
    })
    if(pregDayBoolean){
      this.toast.error("Duplicate pregnancy day");
    }else{
      let data = {
        url:  this.mediaUrl,
        ...this.bookForm.value
      }
      this.firebaseService.updateDoc("tasks",this.bookData.id,data).then(()=>{
        this.toast.success("Task Updated Successfully");
        this.dialogRef.close();
      }),err=>{
        this.toast.error("Something went wrong ");
        console.log(err);
      }
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
