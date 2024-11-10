// import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/classes/Orders';
import { Trip } from 'src/app/classes/Trip';
import { TypesTrip } from 'src/app/classes/TypesTrip';
import { User } from 'src/app/classes/User';
import { OrderService } from 'src/app/serv/orders.service';
import { UserService } from 'src/app/serv/user.service';
import { TripService } from 'src/app/services/trip.service';
import { TypeTripService } from 'src/app/services/type-trip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})

export class AllTripsComponent implements OnInit {
  // private datePipe: DatePipe,
  constructor(public us: UserService, public st: TripService, public stt: TypeTripService, public r: Router, public os: OrderService) {
    this.current = this.us.getCurrentuser()
    this.norder = new Orders(0, this.current.id!, this.current.name, new Date(), undefined, 0, "", new Date(), 1)

  }
  // currentDate: Date = new Date();
  // currentYear: number = this.currentDate.getFullYear();
  // currentmon: number = this.currentDate.getMonth();
  // currentday: number = this.currentDate.getDay();
  ListT: Trip[] = []
  sortedListT: Trip[] = []
  ListTT: Array<TypesTrip> = new Array<TypesTrip>()
  order: Orders | undefined
  current: User
  norder: Orders| undefined
  // currentDateTime: string | undefined;
  // gg: DatePipe | undefined
  ngOnInit(): void {
    // this.getCurrentDateTime();

    // console.log(this.currentDate);
    // this.norder = new Orders(0, this.current.id!, this.current.name, new Date(), undefined, 0, "", new Date(), 1)
    this.st.getAllTrips().subscribe(
      succ => {
        this.ListT = succ
        this.sortedListT = this.ListT
        console.log("ListT", this.ListT)
      },
      err => { console.log(err) }
    )
    this.stt.getAllType().subscribe(
      succ => {
        this.ListTT = succ
        console.log("ListTTTT", this.ListTT);
      },
      err => { console.log(err) }
    )
    console.log("sortedListT", this.sortedListT);
  }
  // getCurrentDateTime(){
  //   const currentDate = new Date();
  //   this.gg = this.datePipe
  // }
  sortBy(id: number): void {
    if (id == -1)
      this.sortedListT = this.ListT
    else {
      this.sortedListT = this.ListT.filter(t => t.codeType == id);
      console.log("sortedListT", this.sortedListT);
      console.log("ListT", this.ListT);
    }
  }
  show(id: number): void {
    this.r.navigate([`/SingleTrip`, id])
  }

  QuickOrder(trip: Trip) {
    // const myDate = new Date();
    console.log("this.norder",this.norder);
    
    this.norder!.codeTrip = trip.id
    this.norder!.destination = trip.destination
    this.norder!.date = trip.date
    if (this.current.id != -1) {
      if (trip.availablePlaces! > 0) {

        // console.log("hii",this.current);
        // console.log("norder",this.norder);
        // this.norder.NumberOfPlaces = this.p
        Swal.fire({
          title: "Pay attention please! ",
          text: "with a quick order, the number of tickets is one!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ff00a2",
          cancelButtonColor: "#917486",
          confirmButtonText: "Yes, i want it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.os.addOrder(this.norder!).subscribe(
              succ => {
                Swal.fire({
                  title: `hi ${this.current.name}!`,
                  text: `So glad you joined us!!\nThe experience would not have been worth it-\n without you!!`,
                  icon: "success"
                });
              },
              error => {
                Swal.fire({
                  title: `opss...`,
                  text: "",
                  icon: "error"
                });
                console.log("לא הצליח להוסיף הזמנה");

              }

            )

          }
        });
      }
      else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "we are so sorry!",
          text: "no avalible places for you...",
          showConfirmButton: false,
          timer: 1800
        });
      }
    }
    else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "you are'nt whith us!",
        text: "Please log in",
        showConfirmButton: false,
        timer: 1800
      });
      this.r.navigate([`/login`])
    }
  }
}
