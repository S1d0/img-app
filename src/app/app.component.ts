import { Component, isDevMode } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MaterialModule, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'image-app';
  
  ngOnInit(): void {
    if (isDevMode()) {
      console.log("Development")
    } else {
      console.log("Prod")
    } 
  }

}
