import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../serv/ticketservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seatdemo',
  templateUrl: './seatdemo.component.html',
  styleUrls: ['./seatdemo.component.css']
})

export class SeatdemoComponent implements OnInit {
    constructor(public ticketService: TicketService, private router: Router) {
      this.classes=[]
      this.vagons=[]
      this.seats=[]
    }

    classes: any[];

    vagons: any[];

    seats: any[];

    seatInformation: any;

    ngOnInit() {
        this.seatInformation = this.ticketService.ticketInformation.seatInformation;

        this.classes = [
            { name: 'atractive', code: 'A', factor: 1 },
            { name: 'Resorts', code: 'B', factor: 2 },
            { name: 'landscapes', code: 'C', factor: 3 }
        ];
        this.vagons=[
            { name: 'family', code: 'A', factor: 1 },
            { name: 'friends', code: 'B', factor: 2 },
            { name: 'alone', code: 'C', factor: 3 }
        ]
        this.seats=[
            { name: 'morning', code: 'A', factor: 1 },
            { name: 'afternoon', code: 'B', factor: 2 },
            { name: 'evening', code: 'C', factor: 3 }
        ]
    }

    setVagons(event:any) {
        if (this.seatInformation.class && event.value) {
            this.vagons = [];
            this.seats = [];
            for (let i = 1; i < 3 * event.value.factor; i++) {
                this.vagons.push({ wagon: i + event.value.code, type: event.value.name, factor: event.value.factor });
            }
        }
    }

    setSeats(event:any) {
        if (this.seatInformation.wagon && event.value) {
            this.seats = [];
            for (let i = 1; i < 10 * event.value.factor; i++) {
                this.seats.push({ seat: i, type: event.value.type });
            }
        }
    }

    nextPage() {
        this.ticketService.ticketInformation.seatInformation = this.seatInformation;
        this.router.navigate(['signal/payment']);
    }

    prevPage() {
        this.router.navigate(['signal/personal']);
    }
}