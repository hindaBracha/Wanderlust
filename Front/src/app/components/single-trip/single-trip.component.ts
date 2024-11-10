import { Trip } from 'src/app/classes/Trip';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/serv/trip.service';
import { OrderService } from 'src/app/serv/orders.service';
import { Orders } from 'src/app/classes/Orders';
import { UserService } from 'src/app/serv/user.service';
import { User } from 'src/app/classes/User';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {
  trip: Trip =new Trip()
  avelbleplaces: number = 0
  places: number = 1
  bool: boolean = false
  currentUser:User=this.us.getCurrentuser()
  
  norder:Orders=new Orders(0,this.currentUser.id!,this.currentUser.name,new Date(),undefined,this.trip.id,this.trip.destination,this.trip.date,0)
  constructor(private datePipe: DatePipe,private route: ActivatedRoute,public st:TripService,public r:Router,public os:OrderService,public us:UserService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.st.getTripById(params['id']).subscribe(foundTrip => {
          this.trip = foundTrip;
          this.avelbleplaces = foundTrip.availablePlaces!;
          console.log("fcc",this.trip);
          // this.r.navigate([`SingleTrip${params['id']}/Tickets${params['id']}`])
       this.norder=new Orders(0,this.currentUser.id!,this.currentUser.name,new Date(),undefined,this.trip.id,this.trip.destination,this.trip.date,0)

      });
    });
  
  }
  inc() {
    debugger
    if (this.avelbleplaces > 1) {
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
  order(){
    // const myDate = new Date();
    if(this.currentUser.id!=-1){
      console.log("hii",this.currentUser.id);
      console.log("norder",this.norder);
this.norder.numberOfPlaces=this.places

this.trip.availablePlaces=this.avelbleplaces
this.os.addOrder(this.norder).subscribe(
  succ =>{
    Swal.fire({
      title: `hi ${this.currentUser.name}!`,
      text: "So glad you joined us!!\nThe experience would not have been worth it-\n without you!!",
      // confirmButtonText: ` <i class="fa fa-thumbs-up"></i>`,
      showClass: {
          popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
      },
      hideClass: {
          popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
      }

  });
  },
  error =>{
    
console.log("לא הצליח להוסיף הזמנה");

  }

)
   
    }
    else{
    Swal.fire({
      position: "center",
      icon: "info",
      title: "you are'nt whith us!",
      text: "you need to connect us",
      showConfirmButton: false,
      timer: 1500
    });
    this.r.navigate([`/login`])
    
  }
    
    /////////////////////////////////////////////////
    ////////////////////////////////////////////
    //הוספת ההזמנה ועידכון הטיול
  }
 
}
// constructor(public ts: TripService, public route: ActivatedRoute) { }
//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.ts.getTripById(params['id']).subscribe(foundTrip => {
//         console.log("jj",foundTrip);
//         this.trip = foundTrip;
//         this.avelbleplaces = foundTrip.availablePlaces!;
//         console.log("fcc", this.trip);
//       });
//     });
   
//   }
 
// }
// {
//   "id": 0,
//   "codeUser": 2,
//   "name": "hinda frumer",
//   "orderDate": "2024-12-16T00:00:00",
//   "orderTime": "14:30:00",
//   "codeTrip": 3,
//   "destination": "Kashuala Farm",
//   "date": "2024-04-03T00:00:00",
//   "numberOfPlaces": 2
// }