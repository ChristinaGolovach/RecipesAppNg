import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { FileUpload } from '../models/file-upload.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private db: AngularFireDatabase) { }

  private basePath = '/uploads';

  pushFileToStorage(fileUpload: FileUpload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    return from(uploadTask.snapshot.ref.getDownloadURL());
  }

  deleteFileFromStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
