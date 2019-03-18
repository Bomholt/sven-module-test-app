import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {FileServiceService} from '../../files/shared/file-service.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  fileToUpload: File;
  productFormGroup: FormGroup;

  constructor(private ps: ProductService,
              private fs: FileServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
  }

  addProduct() {
    const productData = this.productFormGroup.value;
    if (this.fileToUpload) {
      this.fs.upLoad(this.fileToUpload)
        .pipe(
          switchMap(metadata => {
            productData.pictureId = metadata.id;
            return this.ps.addProduct(productData);
          })
        ).subscribe(pro => {
        this.router.navigate(['../'],
          {relativeTo: this.activatedRoute});
        // window.alert('Product was added with ID: ' + pro.id + ' Name: ' + pro.name);
      });
    }
  }

  uploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }

  goBack() {
    this.router.navigate(['../'],
      {relativeTo: this.activatedRoute});
  }
}
