import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import firebase from 'firebase'
import {MatSnackBar} from '@angular/material/snack-bar';
import { DashboardMenu } from '../shared/common/dashboard-menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  menus: any
  constructor(private menu: DashboardMenu){
    this.menus = menu.getMenuitem();
  }

ngOnInit(): void {

}
}
