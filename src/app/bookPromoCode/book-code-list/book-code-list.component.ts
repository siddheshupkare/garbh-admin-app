import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookCodeUploadComponent } from '../book-code-upload/book-code-upload.component';
import firebase from 'firebase'
@Component({
  selector: 'app-book-code-list',
  templateUrl: './book-code-list.component.html',
  styleUrls: ['./book-code-list.component.css']
})
export class BookCodeListComponent implements OnInit {
  bookCodes: any = [];
  value: any;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBookCodes();
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(BookCodeUploadComponent, {
      width: '850px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBookCodes();
    });
  }

  getBookCodes(){
    firebase.firestore().collection("codes").get().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        const item= doc.data()
        this.bookCodes.push(item)
      })
    })
    console.log("codes",this.bookCodes)
  }


}
