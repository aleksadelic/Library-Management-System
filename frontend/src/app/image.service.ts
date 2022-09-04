import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  uploadImage(file: File) {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.uri}/users/uploadImage`, formData);
  }
}
