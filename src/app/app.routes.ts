import { Routes } from '@angular/router';
import { ImageConverterComponent } from './image-converter/image-converter.component';
import { BgRemoverComponent } from './bg-remover/bg-remover.component';

export const routes: Routes = [
  {
    path: 'convert',
    component: ImageConverterComponent,
  },
  {
    path: 'bgremove',
    component: BgRemoverComponent,
  },
  { path: '', redirectTo: '/convert', pathMatch: 'full' },
];
