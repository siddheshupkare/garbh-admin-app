import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import { DashboardMenu } from './common/dashboard-menu';


@NgModule({
  declarations: [
    FileDragDropDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  providers:[
    DashboardMenu
  ]

})
export class SharedModule { }
