import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AddBookComponent } from "./add-book/add-book.component";
import { FullComponent } from "./appLayout/full/full.component";
import { BookCodeListComponent } from "./bookPromoCode/book-code-list/book-code-list.component";
import { ContactusqueriesComponent } from "./contactusqueries/contactusqueries.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditbookComponent } from "./editbook/editbook.component";
import { EditmusicandshloksComponent } from "./editmusicandshloks/editmusicandshloks.component";
import { FaqComponent } from "./faq/faq.component";
import { LoginComponent } from "./login/login.component";
import { MotivationalquotesComponent } from "./motivationalquotes/motivationalquotes.component";
import { MusicandshloksComponent } from "./musicandshloks/musicandshloks.component";
import { ShlokComponent } from "./shlok/shlok.component";
import { SpecialVideoComponent } from "./special-video/special-video.component";
import { TaskComponent } from "./task/task.component";
import { YogasanvideosComponent } from "./yogasanvideos/yogasanvideos.component";


const routes: Routes = [
  {
    path:"",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "app",
    component: FullComponent,
    children: [
    {
      path: "",
      component: DashboardComponent
    },
    {
      path: "add-book",
      component: AddBookComponent
    },
    {
      path: 'book-promocode',
      component: BookCodeListComponent
    },
    {
      path: 'editbook',
      component: EditbookComponent
    },
    {
      path: 'addyogasanvideos',
      component: YogasanvideosComponent
    },
    {
      path: 'special-video',
      component: SpecialVideoComponent
    },
    {
      path: 'tasks',
      component: TaskComponent
    },
    {
      path: 'shlok',
      component: ShlokComponent
    },
    { path: 'motivationalqyotes', component: MotivationalquotesComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'musicandshloks', component: MusicandshloksComponent },
    { path: 'Editmusicandshloks', component: EditmusicandshloksComponent },
    { path: 'Contactusqueries', component: ContactusqueriesComponent },
    { path: 'book-promocode', component: BookCodeListComponent }
    ]
  }]


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
