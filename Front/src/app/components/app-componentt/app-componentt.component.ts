import { OnInit, ViewEncapsulation } from '@angular/core';
import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-app-componentt',
  templateUrl: './app-componentt.component.html',
  styleUrls: ['./app-componentt.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponenttComponent implements OnInit {


  ngOnInit(): void {
  }
  scrollOffset = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.scrollOffset = window.scrollY;
    const moveValue = this.scrollOffset / 10; // ניתן להתאים את המכפלה לצורך
    // עדכון סגנון ה-DOM של האלמנט בהתאם לגלילה
    this.renderer.setStyle(this.el.nativeElement, '--move-value', moveValue);
    console.log("moveValue"+moveValue);
    console.log("this.scrollOffset"+this.scrollOffset);
    console.log("this.el.nativeElement"+this.el.nativeElement);    
  }
}

