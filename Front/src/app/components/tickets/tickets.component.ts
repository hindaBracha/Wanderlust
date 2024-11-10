import { ActivatedRoute, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/classes/Trip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  constructor(public ts: TripService, public route: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.ts.getTripById(params['id']).subscribe(foundTrip => {
        console.log("jj",foundTrip);
        this.trip = foundTrip;
        this.avelbleplaces = foundTrip.availablePlaces!;
        console.log("fcc", this.trip);
      });
    });
  }
  trip: Trip | undefined
  avelbleplaces: number = 0
  places: number = 1
  bool: boolean = false
  inc() {
    if (this.avelbleplaces > 0) {
      this.places++;
      this.avelbleplaces--;
      this.bool = false

    }
    else
      this.bool = true
  }
  dic() {
    if (this.places > 1) {
      this.places--
      this.avelbleplaces++
      this.bool = false

    }
  }
}
