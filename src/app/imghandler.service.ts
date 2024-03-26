import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment'

@Injectable({
  providedIn: 'root',
})
export class ImghandlerService {
  bgRemoverbaseURL;

  constructor(private http: HttpClient) {
    this.bgRemoverbaseURL = environment.bg_remover_url;
  }

  handleFiles(files: FileList): Observable<any> {
    let formData = new FormData();
    formData.append('file', files[0]);
    return this.http.post(`${this.bgRemoverbaseURL}/upload`, formData, {
      responseType: 'blob',
      observe: 'events',
    });
  }

  convertImages(files: FileList): Observable<any> {
    let formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name)
    }

    return this.http.post('/api/upload', formData, {
      responseType: 'blob',
      observe: 'events',
    });
  }
}
