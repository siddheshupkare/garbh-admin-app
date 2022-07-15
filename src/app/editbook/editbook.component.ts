import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import firebase from 'firebase'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
mobileQuery: MediaQueryList;
  state:any=false;
  value=0;
  status="No Files to Upload"
  fname
  members: {url: any}[] = [
  ];

  downurl: any[] = [];
  files: File[] = [];
  files1: File[] = [];

  chaptername;chapterurl;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  downloadurl123
  
  ngOnInit(): void {

    var arr=[]

    firebase.firestore().collection("Book").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          arr.push({"url":doc.data().url,"name":doc.data().name,"description":doc.data().description})

          this.files1=arr


      });
  });
  
    
  }

  
  download: any[] = [];




onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);

  console.log(this.files)
  var storageRef = firebase.storage().ref();


 

}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}



update(name,url,description)

{ 
console.log(name,url,description)

firebase.firestore().collection("Book").doc(name).update({ 

  url: url,
  description: description,
  
}).then(() =>{
  this._snackBar.open("Updated Book "+name+"", "", {
    duration: 2000,
    
  }
  
  );

})
}

delete(name,url,description)

{ 
console.log(name,url,description)

firebase.firestore().collection("Book").doc(name).delete().then(() => {
  this.ngOnInit()
  this._snackBar.open("Deleted Book "+name+"", "", {
    duration: 2000,
    
  }
  
  );
}).catch((error) => {
  console.error("Error removing document: ", error);
})
}

upload()
{ 

  this.status="Uploading ......"

  console.log(this.files)
  var storageRef = firebase.storage().ref();





  for (var i=0;i<this.files.length;i++) {


    console.log("filename",this.files[i].name)

    

    


    var uploadTask = storageRef.child("images/addbooks.jpg/"+this.files[i].name+"").put(this.files[i]);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        this.value=progress
        
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

          this.downurl.push(downloadURL);
          console.log('File available at', this.downurl.length);


          if (this.downurl.length == this.files.length)
          { 
            console.log('Upload Finished')
            this.status="Upload Finished"
            this.state =true
          }


          
        });
      }
     
      
    );
  


    


    
  }

 
  // console.log("Print after for loop")


  
}


copy()
{ 

  this._snackBar.open("Copied Url to clipboard", "", {
    duration: 2000,
    
  }
  
  );
}

addchapter(myform)
 
{ 
  console.log("chapname",myform.value.name)
  console.log("chapurl",myform.value.url)
  console.log("chapdescription",myform.value.description)



  firebase.firestore().collection("Book").doc(myform.value.name).set({
      name:myform.value.name,
      url:myform.value.url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      description:myform.value.description

  }).then(()=>{
    console.log("sucess")
    this._snackBar.open("Chapter has been added sucessfully", "", {
      duration: 2000,
      
    }
    
    );

  })
}


link()
{
  
  
  for (var i=0;i<this.files.length;i++) {
  var storageRef = firebase.storage().ref();
  storageRef.child("images/addbooks.jpg/"+this.files[i].name+"").getDownloadURL()
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);

    

    this.members.push({"url":url})

    console.log("downloadurl",url)


    xhr.send();

   
  })
  .catch((error) => {
    // Handle any errors
  });
}
}

}
