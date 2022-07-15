import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  constructor(private toaster: ToastrService) { }

  success(msg:string, title?:string){
    this.toaster.success(msg, title)
  }

  error(msg:string, title?:string, override?: Partial<IndividualConfig>){
    this.toaster.error(msg, title)
  }

  info(msg:string, title?:string){
    this.toaster.info(msg, title)
  }

  warning(msg:string, title?:string){
    this.toaster.warning(msg, title)
  }
}
