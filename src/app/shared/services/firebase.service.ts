import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firebase: AngularFirestore) { }

  getDocs(collectionName: any){
      return this.firebase.collection(collectionName).snapshotChanges();
  }

  getDocById(collectionName: any, docId: any){
    return this.firebase.collection(collectionName).doc(docId).get();
  }
  updateDoc(collectionName: any, docId: any, data: any){
    return this.firebase.collection(collectionName).doc(docId).update(data);
  }

  deleteDoc(collectionName: any, docId: any){
    return this.firebase.collection(collectionName).doc(docId).delete();
  }

  createDoc(collectionName: any, data: any){
    return this.firebase.collection(collectionName).add(data);
  }

}
