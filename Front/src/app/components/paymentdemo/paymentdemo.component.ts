import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../serv/ticketservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentdemo',
  templateUrl: './paymentdemo.component.html',
  styleUrls: ['./paymentdemo.component.css']
})

export class PaymentdemoComponent implements OnInit {
    paymentInformation: any;

    constructor(public ticketService: TicketService, private router: Router) {}

    ngOnInit() {
        this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
    }

    nextPage() {
        this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
        this.router.navigate(['signal/confirmation']);
    }

    prevPage() {
        this.router.navigate([`signal/seat`]);
    }
}