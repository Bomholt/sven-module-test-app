import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
products: Observable<Product[]>;
  productFormGroup: FormGroup;
  constructor(private ps: ProductService) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.products = this.ps.getProducts();
  }

  deleteProduct(pro: Product) {
    const obs = this.ps.deleteProduct(pro.id);
      obs.subscribe(productFromBackend => {
        window.alert('Product with id: ' + productFromBackend.id + ' was deleted');
      }, error1 => {
        window.alert(error1.toString() + 'ID: ' + pro.id);
      });
  }

  addProduct() {
    const np = this.productFormGroup.value;
    this.ps.addProduct(np)
      .subscribe(pro => {
        window.alert('Product was added with ID: ' + pro.id + ' Name: ' + pro.name);
      });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    debugger;
  }

}
