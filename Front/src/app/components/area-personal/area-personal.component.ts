import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/classes/Orders';
import { Trip } from 'src/app/classes/Trip';
import { TypesTrip } from 'src/app/classes/TypesTrip';
import { User } from 'src/app/classes/User';
import { ImageService } from 'src/app/serv/image.service';
import { OrderService } from 'src/app/serv/orders.service';
import { TripService } from 'src/app/serv/trip.service';
import { TypesTripsService } from 'src/app/serv/types-trips.service';
import { UserService } from 'src/app/serv/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-personal',
  templateUrl: './area-personal.component.html',
  styleUrls: ['./area-personal.component.scss']
})
export class AreaPersonalComponent implements OnInit {
  constructor(public Is: ImageService,public tts: TypesTripsService, public Os: OrderService, public Ts: TripService, public Us: UserService, public rout: Router) { }

  ngOnInit() {
    debugger
    this.newUser = this.Us.getCurrentuser();
    this.currentuserid = this.newUser.id!
    if (this.currentuserid + "" == localStorage.getItem('manager')) {
      this.Manager = true
    }
    console.log("this.Manager", this.currentuserid);
    this.getAllUsers()
    this.allTripsUser()

    this.tts.getAllType().subscribe(
      succ => {
        this.options = succ
      },
      err => {
        console.log("err");
      })
  }

  selectedOption = ''
  current: boolean = false;
  myArea: boolean = false;
  imageDataURL = this.Us.getcurrentimg()
  newUser: User = new User();
  First: boolean = false;
  Manager: boolean = false;
  canShow: boolean = false;
  showOptions: boolean = false;
  pass: string | undefined
  email: string | undefined
  ListU: Array<User> = new Array<User>()
  Allorders: Array<Orders> = new Array<Orders>()
  temporders: Array<Orders> = new Array<Orders>()
  lonly: boolean = false;
  count: number = 4;
  imageUrls: string[] = [];
  currentuser: User | undefined
  currentuserid: number = 0
  showOrders: boolean = false;
  showChangs: boolean = false;
  order:Orders|undefined
  AllTrip: Array<Trip> = new Array<Trip>()
  filterPastTrips: string | null = null; // לסינון עבר/עתיד
  filterType: string | undefined; // לסינון לפי סוג הטיול
  filterByPrice: number | null = null; // לסינון לפי מחיר
  options: TypesTrip[] = []
  codeTypeOption: TypesTrip | null = null;
  ListTFilter: Trip[] = []
  fshowOrders() {
    this.showOrders = true
    this.showChangs = false
  }
  fshowChangs() {
    this.showOrders = false
    this.showChangs = true
  }

  allTripsUser() {
    debugger
    this.Us.getAllTripsForUser(this.newUser.id!).subscribe(
      succ => {
        this.AllTrip = succ
        this.ListTFilter = succ
        console.log("this.AllTrip", this.AllTrip);

      },
      err => {
        console.log("err");
      })
  }

  //  סינון לפי מחיר
  filterTripsByPrice() {
    if (this.filterByPrice === null) {
      this.ListTFilter = this.AllTrip;
    } else {
      this.ListTFilter = this.AllTrip.filter((trip) => trip.price! <= this.filterByPrice!);
    }
  }
  // סינון לפי תאריך

  filterTrips() {
    if (typeof this.filterPastTrips === 'undefined' || this.filterPastTrips === null) {
      this.ListTFilter = this.AllTrip;
      return;
    }
    const isPast = this.filterPastTrips === "true";
    const currentDate = new Date().getTime();
    this.ListTFilter = this.AllTrip.filter(this.filterByDate(isPast, currentDate));
  }
  // סינון לפי תאריך ובדיקה

  filterByDate(isPast: boolean, currentDate: number) {
    return (trip: any) => {
      const tripDate = new Date(trip.date).getTime();
      return isPast ? tripDate < currentDate : tripDate >= currentDate;
    };
  }
  // הכנסת ההזמנות לפי המשתמש הנוכחי

  FilterTripType() {
    this.ListTFilter = this.AllTrip.filter(a => a.nameType == this.filterType!)
  }

  cancelTrip(id:Number) {
    debugger
    if (confirm('Are you sure you want to cancel this trip?'))
    this.Os.getAllOrders().subscribe( 
       succ => {
        debugger
        console.log('all orders',succ,"id",id,"a.CodeUser",this.newUser.id);
        this. order = succ.find(a => a.codeUser==this.newUser.id&&a.codeTrip==id)
        console.log(' order',this.order);
        this.Os.deleteOrder(this.order?.id!).subscribe(
          succ => {
            debugger
            this.allTripsUser()
            console.log('Trip canceled successfully',succ);
          },
          error => {
            // console.error('Error canceling trip:', error);
          }
        );
    },
    err => {
      console.log(err);
    })
        
  }

  getAllUsers() {
    debugger
    this.Us.getAllUsers().subscribe(
      succ => {
        this.ListU = succ
      },
      err => {
        console.log(err);
      })

  }
  // allTripsUser() {
  //   debugger
  //   this.Os.getAllOrders().subscribe(
  //     succ => {
  //       console.log("sec");
  //       console.log("cdcdc", this.currentuserid);
  //       console.log("cdcdc", this.temporders);
  //       console.log("cdcdc", this.Allorders);
  //       this.temporders = succ
  //       this.Allorders = this.temporders.filter(o => o.CodeUser == this.currentuserid)

  //     },
  //     err => {
  //       console.log("err");
  //     })
  // }
  send() {
    debugger
    this.newUser.id = 0
    this.Us.updateUser(this.currentuserid, this.newUser).subscribe(
      succ => {
        console.log(succ, " updateUser secsses ", this.newUser.name);
        // this.newUser = new User();
        this.showChangs = false
      },
      err => {
        debugger
        console.log(err);
        if (err.error && err.error.message) {
          console.log(err.error.message);
        } else {
          console.log("An error occurred on the server.");
        }
      }
    );
  }
  Unsubscribe() {
      debugger
    this.Us.deleteUser(this.currentuserid).subscribe(
      succ => {
        debugger
        Swal.fire({
          title: "You're probably dumb enough to delete🥸",
          width: 60000,
          padding: "3em",
          color: "#11111",
          background: `#fff url(../../../assets/pic/צילום מסך 2024-01-21 024344.png)`,
          backdrop: `
            rgba(1,1,1,1)
            left top
            no-repeat
          `
        });
      },
      err => {
        debugger
        console.log(err);
      }
    )

  }
}
