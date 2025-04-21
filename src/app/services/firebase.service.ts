import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }

  uploadImage(file: File): Observable<any> {
    const path = `images/${file.name}`;
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    return task.snapshotChanges();
  }

  getImageUrl(fileName: string): Observable<string> {
    const fileRef = this.storage.ref(`images/${fileName}`);
    return fileRef.getDownloadURL();
  }

}
