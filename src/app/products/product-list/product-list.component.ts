import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
products: Observable<Product[]>;
  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.products = this.ps.getProducts();
  }

  deleteProduct(pro: Product) {
    const obs = this.ps.deleteProduct(pro.id);
      obs.subscribe(productFromBackend => {
        debugger;
        window.alert('Product with id: ' + productFromBackend.id + ' was deleted');
      }, error1 => {
        window.alert(error1.toString() + 'ID: ' + pro.id);
      });
  }

}
