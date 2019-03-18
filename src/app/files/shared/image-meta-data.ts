import {FileMetaData} from './file-metaData';

export interface ImageMetaData {
  base64Image?: string;
  imageBlob?: Blob;
  fileMata: FileMetaData;
}
