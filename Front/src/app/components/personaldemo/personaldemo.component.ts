import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../serv/ticketservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personaldemo',
  templateUrl: './personaldemo.component.html',
  styleUrls: ['./personaldemo.component.css']
})
        
    

export class PersonaldemoComponent implements OnInit {
    personalInformation: any;

    submitted: boolean = false;

    constructor(public ticketService: TicketService, private router: Router) {}

    ngOnInit() {
        this.personalInformation = this.ticketService.getTicketInformation().personalInformation;
    }

    nextPage() {
        if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
            this.ticketService.ticketInformation.personalInformation = this.personalInformation;
            this.router.navigate([`signal/seat`]);
            return;
        }
        this.submitted = true;
    }
}