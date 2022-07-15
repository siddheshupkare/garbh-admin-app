import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../shared/services/firebase.service';
import { BookUploadComponent } from './book-upload/book-upload.component';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookList: any;
  dataSource: any;
  displayedColumns: string[] = ['day', 'title','description', 'edit', 'delete'];
  constructor(private firebaseService: FirebaseService,private dialog: MatDialog,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList(){
    this.firebaseService.getDocs("Book").subscribe((data: any)=>{
      this.bookList=data.map(data=>{
        return({...data.payload.doc.data(),
        id:data.payload.doc.id})
      })
      this.dataSource= new MatTableDataSource(this.bookList)
      console.log(this.bookList);
    },err=>{
      console.log(err)
    })
}


addBook(bookData?: any){
  this.dialog.open(BookUploadComponent,{
    height: "auto",
    width: "500px",
    data: bookData ? bookData : "",

  })
}

onEdit(id: any){
  this.firebaseService.getDocById("Book",id).subscribe((res: any)=>{
    this.addBook({id,...res.data()});
  })

}

onDelete(id: any){
  this.firebaseService.deleteDoc("Book",id).then(()=>{
    this.toastr.success("Deleted Successfully");
  }).catch(err=>{
    console.log(err);
    this.toastr.error("Something went wrong");
  })
}

}
