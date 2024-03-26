import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isVisible: boolean = false

  toggleProductMenu() {
    this.isVisible = !this.isVisible
  }

  showProductMenu() {
    this.isVisible = true
  }
  
  hideProductMenu() {
    this.isVisible = false
  }
}
