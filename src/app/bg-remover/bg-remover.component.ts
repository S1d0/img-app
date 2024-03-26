import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImghandlerService } from '../imghandler.service';
import { saveAs } from 'file-saver';
import { finalize } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-bg-remover',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [ImghandlerService],
  templateUrl: './bg-remover.component.html',
})
export class BgRemoverComponent {
  isDragging = false;
  showSpinner = false;

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
    this.removeBg(files);
  }

  onChange(event: any) {
    const file: FileList = event.target?.files;
    if (file) {
      this.removeBg(file);
    }
  }

  private removeBg(file: FileList) {
    const fileName = file[0].name.split(".")[0] + '_nobg.png'
    this.imgService
      .handleFiles(file)
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
    this.showSpinner = false;
  }
}
