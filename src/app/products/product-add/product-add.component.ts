import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageMetaData} from '../../files/shared/image-meta-data';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  private croppedBlob: Blob;

  constructor(private ps: ProductService,
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
    const imageMeta = this.getMetaDataForImage();

    this.ps.addProductWithImage(productData, imageMeta)
      .subscribe(pro => {
        this.router.navigate(['../'],
          {relativeTo: this.activatedRoute});
        // window.alert('Product was added with ID: ' + pro.id + ' Name: ' + pro.name);;
  });
  }

  private getMetaDataForImage(): ImageMetaData {
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    const imageMeta: ImageMetaData = {
      imageBlob: this.croppedBlob,
      fileMata: {
        name: fileBeforeCrop.name,
        type: this.croppedBlob.type,
        size: this.croppedBlob.size
      }
    };
    return imageMeta;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

  goBack() {
    this.router.navigate(['../'],
      {relativeTo: this.activatedRoute});
  }
}
