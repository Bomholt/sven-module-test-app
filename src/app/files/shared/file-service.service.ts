import { Injectable } from '@angular/core';
import {defer, from, Observable} from 'rxjs';
import {FileMetaData} from './file-metaData';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  upLoad(file: File): Observable<FileMetaData> {
    return this.addFileMetaData(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }).pipe(
        switchMap(fileMeta => {
          return defer(() =>
            this.storage.ref('product-pictures/' + fileMeta.id)
            .put(file)
              .then())
            .pipe(map(fileRef => {
              return fileMeta;
            }));
        })
    );
  }

  addFileMetaData(meta: FileMetaData): Observable<FileMetaData> {
    return defer(() => this.db.collection('files')
      .add(meta)).pipe(
        map(documentRef => {
          meta.id = documentRef.id;
          return meta;
        })
    );
  }

  getFileURL(id: string): Observable<any> {
    return this.storage.ref('product-pictures/' + id)
      .getDownloadURL();
  }

}
