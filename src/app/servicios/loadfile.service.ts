import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, snapshotChanges } from 'angularfire2/database';
import * as firebase from 'firebase';
/** Importamos las clase que creamos para los archivos */
import { Archivo } from '../uploads/file.modal';
import { AngularFireAuthModule } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class LoadfileService {

  /** Rutas para el servicio de almacenamiento en firebase */
  private basePath: String = '/uploads';
  uploads: AngularFireList<Archivo[]>;

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  pushUpload(upload: Archivo) {
    const storageRef = firebase.storage().ref();
    /** Sube el archivo y nos crea una ruta para poder utilizarlo */
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        /*   Upload en proceso */
        upload.progress = (
                          uploadTask.snapshot.bytesTransferred
                          / uploadTask.snapshot.totalBytes
                          ) * 100;
        console.log(upload.progress);
      },

      (error) => {
            console.log(error);
            console.log('debug');
      },

      () => {
              upload.url = uploadTask.snapshot.downloadURL;
              upload.name = upload.file.name;
              this.saveFileDate(upload);
      }
    );
  }

  private saveFileDate(upload: Archivo) {
    this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
  }

}
