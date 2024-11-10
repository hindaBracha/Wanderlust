import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.css']
})
export class StickyHeaderComponent {
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const offset = window.pageYOffset;
    this.isSticky = offset > 50;
  }
}