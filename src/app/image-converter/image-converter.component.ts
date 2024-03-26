import { Component } from '@angular/core';
import { ImghandlerService } from '../imghandler.service';
import { finalize } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import saveAs from 'file-saver';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-image-converter',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './image-converter.component.html',
})
export class ImageConverterComponent {
  isDragging = false;
  uploadProgress: number = 0;
  showSpinner = false;
  greetings = "";

  constructor(private imgService: ImghandlerService) {}

  onImageDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer!!.files;
    this.convertImage(files);
  }

  onChange(event: any) {
    const file: FileList = event.target?.files;
    if (file) {
      this.convertImage(file);
    }
  }

  private convertImage(fileList: FileList) {
    const fileName = 'converted.zip';
    this.imgService
      .convertImages(fileList)
      .pipe(finalize(() => this.reset()))
      .subscribe({
        next: (event: HttpEvent<any>) => this.handleNextEvent(event, fileName),
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Completed'),
      });
  }

  private handleNextEvent(event: HttpEvent<any>, fileName: string) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.showSpinner = true;
        break;
      case HttpEventType.Response:
        console.log('😺 Done!', event.body);
        try {
          saveAs(event.body, fileName);
        } catch (e) {
          console.log('Error uploading: ', e);
        }
        this.reset();
    }
  }

  private reset() {
    this.uploadProgress = 0;
    this.showSpinner = false;
  }
}
