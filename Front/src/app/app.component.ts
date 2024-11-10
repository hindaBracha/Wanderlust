import { Component, OnInit } from '@angular/core';
import { IfService } from './serv/if.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
constructor(public IfService:IfService){}
  ngOnInit(): void { 
      //  this.show = "" + sessionStorage.getItem("ok")
      localStorage.setItem('manager','1')
      localStorage.setItem('currentuser','')

  }

  title = 'angularProject';
  show = ""
  
  check() {
    if (this.IfService.ok == true)
      return true
    return false
  }

}
