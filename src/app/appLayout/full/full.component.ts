import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardMenu } from 'src/app/shared/common/dashboard-menu';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  menus: any;

  constructor(changeDetectorRef: ChangeDetectorRef,
    private menu: DashboardMenu,
    private route: Router,
    media: MediaMatcher,private _snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit(): void {
    this.menus = this.menu.getMenuitem();
  }

  logout(){
    this.route.navigateByUrl("login")
  }
}
