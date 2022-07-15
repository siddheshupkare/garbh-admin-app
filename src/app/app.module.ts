import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { EditbookComponent } from './editbook/editbook.component';
import { YogasanvideosComponent } from './yogasanvideos/yogasanvideos.component';
import { MotivationalquotesComponent } from './motivationalquotes/motivationalquotes.component';
import { FaqComponent } from './faq/faq.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { MusicandshloksComponent } from './musicandshloks/musicandshloks.component';
import { EditmusicandshloksComponent } from './editmusicandshloks/editmusicandshloks.component';
import { ContactusqueriesComponent } from './contactusqueries/contactusqueries.component';
import { BookCodeListComponent } from './bookPromoCode/book-code-list/book-code-list.component';
import { BookCodeUploadComponent } from './bookPromoCode/book-code-upload/book-code-upload.component';
import { FullComponent } from './appLayout/full/full.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterial } from './angular.material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { AddBookComponent } from './add-book/add-book.component';
import { SpecialVideoComponent } from './special-video/special-video.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddMotivationalVideoComponent } from './motivationalquotes/add-motivational-video/add-motivational-video.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { AddMusicShlokComponent } from './musicandshloks/add-music-shlok/add-music-shlok.component';
import { BookUploadComponent } from './add-book/book-upload/book-upload.component';
import { ShlokComponent } from './shlok/shlok.component';
import { AddShlokComponent } from './shlok/add-shlok/add-shlok.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EditbookComponent,
    YogasanvideosComponent,
    MotivationalquotesComponent,
    FaqComponent,
    MusicandshloksComponent,
    EditmusicandshloksComponent,
    ContactusqueriesComponent,
    BookCodeListComponent,
    BookCodeUploadComponent,
    FullComponent,
    UploadVideoComponent,
    AddBookComponent,
    SpecialVideoComponent,
    AddMotivationalVideoComponent,
    TaskComponent,
    AddTaskComponent,
    AddMusicShlokComponent,
    BookUploadComponent,
    ShlokComponent,
    AddShlokComponent

  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ClipboardModule,
    AngularMaterial,
    DragDropModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    // AngularFireModule,
    // RouterModule.forRoot(
    //   [
    //   { path: 'login', component: LoginComponent},
    //   { path: 'dashboard', component: DashboardComponent},
    //   { path: 'editbook', component: EditbookComponent},
    //   { path: 'addyogasanvideos', component: YogasanvideosComponent},
    //   { path: 'motivationalqyotes', component: MotivationalquotesComponent},
    //   { path: 'faq', component: FaqComponent},
    //   { path: 'musicandshloks', component: MusicandshloksComponent},
    //   { path: 'Editmusicandshloks', component: EditmusicandshloksComponent},
    //   { path: 'Contactusqueries', component: ContactusqueriesComponent},
    //   { path: 'book-promocode', component: BookCodeListComponent}
    //   // { path: '**', redirectTo: 'mainpage' }
    // ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
