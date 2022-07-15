import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-motivational-video',
  templateUrl: './add-motivational-video.component.html',
  styleUrls: ['./add-motivational-video.component.css']
})
export class AddMotivationalVideoComponent implements OnInit {
  videoForm: any
  constructor(private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      url: ['',Validators.required],
      duration: ['',Validators.required]
    })
    // if(this.videoData.id !== undefined || this.videoData.id !== ""){
    //     this.setFormValue();
    // }
  }


}
