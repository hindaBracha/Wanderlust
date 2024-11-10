import { Component, OnInit } from '@angular/core';
import { HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { IfService } from 'src/app/serv/if.service';
import { UserService } from 'src/app/serv/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2, public r: Router, public IfService: IfService, public UserService: UserService) { }

  scrollOffset = 0;
  isLoggedIn = false;
  imageDataURL: string | undefined

  toggleNav() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.scrollOffset = window.scrollY;
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translatex(${this.scrollOffset}px)`);
  }
  pass() {
    this.r.navigate([`/login`])
  }
  // get pic() {
  //   this.imageDataURL= this.UserService.getcurrentimg()
  //   return this.imageDataURL;
  // }
  ngOnInit() {
    this.imageDataURL = this.UserService.getcurrentimg()

    // sessionStorage.setItem("currentpic", "../../../assets/pic/פרופילמשתמש.png")
  }

  personal() {
    console.log("currenuser", localStorage.getItem('currenuser'));

    if (this.UserService.getCurrentuser().id == -1) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "you are'nt whith us!",
        text: "you need to connect us",
        showConfirmButton: false,
        timer: 1500
      });
      this.r.navigate([`/login`])

    }
    else
      this.r.navigate([`/area-personal`])

  }
  toTrip() {
    this.r.navigate([`/trips`])
  }

}

