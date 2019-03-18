import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {FormControl, FormGroup} from '@angular/forms';
import {FileServiceService} from '../../files/shared/file-service.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
products: Observable<Product[]>;

  constructor(private ps: ProductService,
              private fs: FileServiceService) {}

  ngOnInit() {
    this.products = this.ps.getProducts()
      .pipe(
        tap(products => {
          products.forEach(product => {
            if (product.pictureId) {
            this.fs.getFileURL(product.pictureId)
              .subscribe(url => {
                product.url = url;
              });
            }
          });
        })
      );
  }

  deleteProduct(pro: Product) {
    const obs = this.ps.deleteProduct(pro.id);
      obs.subscribe(productFromBackend => {
        window.alert('Product with id: ' + productFromBackend.id + ' was deleted');
      }, error1 => {
        window.alert(error1.toString() + 'ID: ' + pro.id);
      });
  }



}
