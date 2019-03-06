import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Product} from './product.model';
import {map, map, switchMap} from 'rxjs/operators';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products')
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          return {
            id: action.payload.doc.id,
            name: data.name};
        });
      }));
  }

  deleteProduct(id: string): Observable<Product> {
    return this.db.doc<Product>('products/' + id)
      .get().pipe(switchMap(productDocument => {
        if (!productDocument || !productDocument.data()){
          throw new Error('Product was not found');
        } else {
          return from(this.db.doc<Product>('products/' + id)
            .delete())
            .pipe(map(() => {
              const data = productDocument.data() as Product;
              data.id = productDocument.id;
              return data;
            }));
        }
    }));

    /*
    return Observable.create(ob => {
      this.db.doc<Product>('products/' + id).delete()
        .then(() => ob.next())
        .catch(er => ob.error(er))
        .finally(() => ob.complete());
    });*/
  }
}
